#!/usr/bin/env node

import { Command } from "commander";

import initializeApp from "./app.js";
import workerCommand from "./commands/workerCommand.js";
import enqueueCommand from "./commands/enqueueCommand.js";
import dlqCommand from "./commands/dlqCommand.js";
import statusCommand from "./commands/statusCommand.js";
import configCommand from "./commands/configCommand.js";

const program = new Command();

const bootstrap = async () => {
  await initializeApp();

  program
    .name("queuectl")
    .description("Background Job Queue CLI")
    .version("1.0.0");

  program.addCommand(enqueueCommand);
  program.addCommand(dlqCommand);
  program.addCommand(workerCommand);
  program.addCommand(statusCommand);
  program.addCommand(configCommand);

  program.parse(process.argv);
};

bootstrap();
