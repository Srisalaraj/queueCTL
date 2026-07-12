import { Command } from "commander";

import {
  setConfig,
  getConfig,
  listConfigs,
} from "../controllers/configController.js";

const configCommand = new Command("config");

configCommand
  .command("set")
  .argument("<key>")
  .argument("<value>")
  .description("Set Configuration")
  .action(async (key, value) => {
    await setConfig(key, value);
  });

configCommand
  .command("get")
  .argument("<key>")
  .description("Get Configuration")
  .action(async (key) => {
    await getConfig(key);
  });

configCommand
  .command("list")
  .description("List Configurations")
  .action(async () => {
    await listConfigs();
  });

export default configCommand;
