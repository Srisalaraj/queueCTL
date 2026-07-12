import { Command } from "commander";
import { showStatus } from "../controllers/statusController.js";

const statusCommand = new Command("status");

statusCommand.description("Display Queue Status").action(async () => {
  await showStatus();
});

export default statusCommand;
