import mongoose from "mongoose";

const workerSchema = new mongoose.Schema(
  {
    workerId: {
      type: String,
      required: true,
      unique: true,
    },

    pid: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["running", "stopped"],
      default: "running",
    },

    currentJob: {
      type: String,
      default: null,
    },

    heartbeat: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const Worker = mongoose.model("Worker", workerSchema);

export default Worker;
