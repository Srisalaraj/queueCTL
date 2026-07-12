import Job from "../models/jobModel.js";
import Worker from "../models/workerModel.js";
import { JOB_STATE, WORKER_STATE } from "../utils/constants.js";

export const getQueueStatus = async () => {
  const [pending, processing, completed, dead, runningWorkers, stoppedWorkers] =
    await Promise.all([
      Job.countDocuments({ state: JOB_STATE.PENDING }),
      Job.countDocuments({ state: JOB_STATE.PROCESSING }),
      Job.countDocuments({ state: JOB_STATE.COMPLETED }),
      Job.countDocuments({ state: JOB_STATE.DEAD }),
      Worker.countDocuments({ status: WORKER_STATE.RUNNING }),
      Worker.countDocuments({ status: WORKER_STATE.STOPPED }),
    ]);

  return {
    pending,
    processing,
    completed,
    dead,
    runningWorkers,
    stoppedWorkers,
  };
};
