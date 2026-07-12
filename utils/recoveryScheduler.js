import { recoverWorkers } from "../services/recoveryService.js";

export const startRecoveryScheduler = () => {
  setInterval(async () => {
    await recoverWorkers();
  }, 30000);
};
