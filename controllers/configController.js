import * as configService from "../services/configService.js";
import logger from "../utils/logger.js";

export const setConfig = async (key, value) => {
  try {
    const config = await configService.setConfig(key, value);

    logger.success(`${config.key} updated to ${config.value}`);
  } catch (error) {
    logger.error(error.message);
  }
};

export const getConfig = async (key) => {
  try {
    const config = await configService.getConfig(key);

    if (!config) {
      console.log("Configuration not found.");
      return;
    }

    console.table([
      {
        Key: config.key,
        Value: config.value,
      },
    ]);
  } catch (error) {
    logger.error(error.message);
  }
};

export const listConfigs = async () => {
  try {
    const configs = await configService.getAllConfigs();

    if (configs.length === 0) {
      console.log("No configurations found.");
      return;
    }

    console.table(
      configs.map((config) => ({
        Key: config.key,
        Value: config.value,
      })),
    );
  } catch (error) {
    logger.error(error.message);
  }
};
