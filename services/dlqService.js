import Job from "../models/jobModel.js";
import { JOB_STATE } from "../utils/constants.js";

export const getDeadJobs = async () => {
  const jobs = await Job.find({
    state: JOB_STATE.DEAD,
  });

  return jobs;
};

export const retryDeadJob = async (jobId) => {
  const job = await Job.findOne({
    jobId,
  });

  if (!job) {
    throw new Error("Job not found.");
  }

  if (job.state !== JOB_STATE.DEAD) {
    throw new Error("Job is not in Dead Letter Queue.");
  }

  job.state = JOB_STATE.PENDING;

  job.attempts = 0;

  job.nextRetryAt = null;

  job.workerId = null;

  job.lastError = "";

  await job.save();

  return job;
};
