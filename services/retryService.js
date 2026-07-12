import Job from "../models/jobModel.js";

export const handleRetry = async (job) => {
  job.attempts += 1;

  if (job.attempts > job.maxRetries) {
    job.state = "dead";

    await job.save();

    return;
  }

  const delay = Math.pow(2, job.attempts);

  job.state = "pending";

  job.nextRetryAt = new Date(Date.now() + delay * 1000);

  await job.save();
};
