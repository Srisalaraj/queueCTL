import { v4 as uuidv4 } from "uuid";
import Worker from "../models/workerModel.js";
import Job from "../models/jobModel.js";
import { executeCommand } from "../utils/shell.js";
import { handleRetry } from "./retryService.js";
import {
  JOB_STATE,
  POLLING_INTERVAL,
  WORKER_STATE,
} from "../utils/constants.js";
import { delay } from "../utils/delay.js";

export const claimJob = async (workerId) => {
  const filter = {
    state: JOB_STATE.PENDING,
    $or: [{ nextRetryAt: null }, { nextRetryAt: { $lte: new Date() } }],
  };

  const update = {
    $set: {
      state: JOB_STATE.PROCESSING,
      workerId,
      startedAt: new Date(),
    },
  };

  return await Job.findOneAndUpdate(filter, update, {
    returnDocument: "after",
    sort: {
      createdAt: 1,
    },
  });
};

export const processJob = async (job) => {
  console.log(`Processing Job : ${job.jobId}`);
  console.log(`Command : ${job.command}`);

  const result = await executeCommand(job.command);

  if (result.success) {
    job.state = JOB_STATE.COMPLETED;
    job.completedAt = new Date();
    job.lastError = "";

    await job.save();

    console.log(`Job Completed : ${job.jobId}`);
  } else {
    job.lastError = result.output;

    await handleRetry(job);

    console.log(`Retry Scheduled : ${job.jobId}`);
  }
};

export const registerWorker = async () => {
  const worker = await Worker.create({
    workerId: uuidv4(),
    pid: process.pid,
  });

  return worker;
};

export const startHeartbeat = (workerId) => {
  return setInterval(async () => {
    try {
      await Worker.updateOne(
        { workerId },
        {
          heartbeat: new Date(),
        },
      );
    } catch (error) {
      console.error("Heartbeat Error:", error.message);
    }
  }, 5000);
};

let isRunning = true;

export const stopWorkerLoop = () => {
  isRunning = false;
};

export const workerLoop = async (workerId) => {
  console.log("Worker Started...");

  while (isRunning) {
    try {
      // Check worker status from database
      const worker = await Worker.findOne({ workerId });

      if (!worker) {
        console.log("Worker not found.");
        break;
      }

      if (worker.status === WORKER_STATE.STOPPED) {
        console.log("Worker stopped by command.");
        break;
      }

      // Claim a job
      const job = await claimJob(workerId);

      if (job) {
        await processJob(job);
      }
    } catch (error) {
      console.error("Worker Error:", error.message);
    }

    await delay(POLLING_INTERVAL);
  }

  console.log("Worker exited.");
};

let heartbeatTimer = null;

export const setHeartbeatTimer = (timer) => {
  heartbeatTimer = timer;
};

export const shutdownWorker = async (workerId) => {
  isRunning = false;

  if (heartbeatTimer) {
    clearInterval(heartbeatTimer);
  }

  await Worker.updateOne(
    {
      workerId,
    },
    {
      status: "stopped",
      currentJob: null,
    },
  );

  console.log("Worker stopped gracefully.");
};

export const stopWorker = async (workerId) => {
  const worker = await Worker.findOne({
    workerId,
  });

  if (!worker) {
    throw new Error("Worker not found.");
  }

  worker.status = WORKER_STATE.STOPPED;

  await worker.save();

  return worker;
};
