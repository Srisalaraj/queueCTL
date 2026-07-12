import * as dlqService from "../services/dlqService.js";
import { formatJobs, formatJob } from "../utils/jobFormatter.js";

export const listDeadJobs = async () => {
  try {
    const jobs = await dlqService.getDeadJobs();

    if (jobs.length === 0) {
      console.log("No jobs found in Dead Letter Queue.");
      return;
    }

    console.table(formatJobs(jobs));
  } catch (error) {
    console.error(error.message);
  }
};

export const retryDeadJob = async (jobId) => {
  try {
    const job = await dlqService.retryDeadJob(jobId);

    console.log("Job moved back to Queue");

    console.table([formatJob(job)]);
  } catch (error) {
    console.error(error.message);
  }
};
