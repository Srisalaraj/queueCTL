import * as statusService from "../services/statusService.js";
import logger from "../utils/logger.js";

export const showStatus = async () => {
  try {
    const status = await statusService.getQueueStatus();

    console.log("\n========== Queue Status ==========\n");

    console.table([
      {
        Pending: status.pending,
        Processing: status.processing,
        Completed: status.completed,
        Dead: status.dead,
      },
    ]);

    console.log("\n========== Workers ==========\n");

    console.table([
      {
        Running: status.runningWorkers,
        Stopped: status.stoppedWorkers,
      },
    ]);
  } catch (error) {
    logger.error(error.message);
  }
};
