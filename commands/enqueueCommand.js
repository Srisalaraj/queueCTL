import { Command } from "commander";
import { enqueueJob } from "../controllers/jobController.js";

const enqueueCommand = new Command("enqueue");

enqueueCommand
  .description("Add a new job")
  .requiredOption("-c, --command <command>", "Command to execute")
  .option("-r, --retries <number>", "Maximum retries", "3")
  .option("-i, --id <id>", "Custom Job ID")
  .action(async (options) => {
    const jobData = {
      id: options.id,
      command: options.command,
      maxRetries: Number(options.retries),
    };

    await enqueueJob(jobData);
  });

export default enqueueCommand;
