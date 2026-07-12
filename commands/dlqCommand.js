import { Command } from "commander";

import { listDeadJobs, retryDeadJob } from "../controllers/dlqController.js";

const dlqCommand = new Command("dlq");

dlqCommand

  .command("list")

  .description("Show all dead jobs")

  .action(listDeadJobs);

dlqCommand

  .command("retry")

  .argument("<jobId>")

  .description("Retry dead job")

  .action(async (jobId) => {
    await retryDeadJob(jobId);
  });

export default dlqCommand;
