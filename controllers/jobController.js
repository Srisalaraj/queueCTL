import * as jobService from "../services/jobService.js";
import logger from "../utils/logger.js";
import { formatJob } from "../utils/jobFormatter.js";

export const enqueueJob = async (jobData) => {
  try {
    const job = await jobService.createJob(jobData);

    logger.success("Job Added Successfully");

    console.table([formatJob(job)]);
  } catch (error) {
    logger.error("Failed to enqueue job");
    logger.error(error.message);
  }
};
