import * as workerService from "../services/workerService.js";
import logger from "../utils/logger.js";

export const startWorker = async () => {
  try {
    const worker = await workerService.registerWorker();

    logger.success(`Worker Registered : ${worker.workerId}`);

    const timer = workerService.startHeartbeat(worker.workerId);

    workerService.setHeartbeatTimer(timer);

    process.on("SIGINT", async () => {
      console.log("\nStopping worker...");

      await workerService.shutdownWorker(worker.workerId);

      process.exit(0);
    });

    await workerService.workerLoop(worker.workerId);
  } catch (error) {
    logger.error(error.message);
  }
};

export const stopWorker = async (workerId) => {
  try {
    const worker = await workerService.stopWorker(workerId);

    logger.success(`Worker ${worker.workerId} stopped.`);
  } catch (error) {
    logger.error(error.message);
  }
};
