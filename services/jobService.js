import { v4 as uuidv4 } from "uuid";
import Job from "../models/jobModel.js";

export const createJob = async (jobData) => {
  const existingJob = await Job.findOne({
    jobId: jobData.id,
  });

  if (existingJob) {
    throw new Error("Job ID already exists.");
  }

  const job = await Job.create({
    jobId: jobData.id || uuidv4(),

    command: jobData.command,

    maxRetries: jobData.maxRetries || 3,
  });

  return job;
};
