export const formatJob = (job) => ({
  JobID: job.jobId,
  State: job.state,
  Command: job.command,
  Attempts: job.attempts,
  MaxRetries: job.maxRetries,
});

export const formatJobs = (jobs) => {
  return jobs.map(formatJob);
};
