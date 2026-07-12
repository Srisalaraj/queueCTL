import { Command } from "commander";

import { startWorker, stopWorker } from "../controllers/workerController.js";

const workerCommand = new Command("worker");

workerCommand
  .command("start")
  .description("Start Worker")
  .action(async () => {
    await startWorker();
  });

workerCommand
  .command("stop")
  .argument("<workerId>")
  .description("Stop Worker")
  .action(async (workerId) => {
    await stopWorker(workerId);
  });

export default workerCommand;
