import Config from "../models/configModel.js";

export const setConfig = async (key, value) => {
  return await Config.findOneAndUpdate(
    { key },
    { value },
    {
      upsert: true,
      returnDocument: "after",
    },
  );
};

export const getConfig = async (key) => {
  return await Config.findOne({ key });
};

export const getAllConfigs = async () => {
  return await Config.find();
};
