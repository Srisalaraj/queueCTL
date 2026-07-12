import Worker from "../models/workerModel.js";
import Job from "../models/jobModel.js";
import {
  JOB_STATE,
  WORKER_STATE,
  HEARTBEAT_TIMEOUT,
} from "../utils/constants.js";

export const recoverWorkers = async () => {
  const staleTime = new Date(Date.now() - HEARTBEAT_TIMEOUT);

  const deadWorkers = await Worker.find({
    heartbeat: { $lt: staleTime },
    status: WORKER_STATE.RUNNING,
  });

  for (const worker of deadWorkers) {
    console.log(`Recovering Worker : ${worker.workerId}`);

    await Job.updateMany(
      {
        workerId: worker.workerId,
        state: JOB_STATE.PROCESSING,
      },
      {
        $set: {
          state: JOB_STATE.PENDING,
          workerId: null,
        },
      },
    );

    worker.status = WORKER_STATE.STOPPED;
    worker.currentJob = null;

    await worker.save();
  }
};
