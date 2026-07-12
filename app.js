import connectDB from "./config/db.js";
import logger from "./utils/logger.js";
import { startRecoveryScheduler } from "./utils/recoveryScheduler.js";

const initializeApp = async () => {
  try {
    await connectDB();
    startRecoveryScheduler();
    logger.success("QueueCTL Initialized");
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};

export default initializeApp;
