import mongoose from "mongoose";
import { DEFAULT_RETRIES } from "../utils/constants.js";

const jobSchema = new mongoose.Schema(
  {
    jobId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    command: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      enum: ["pending", "processing", "completed", "failed", "dead"],
      default: "pending",
    },

    attempts: {
      type: Number,
      default: 0,
      min: 0,
    },

    maxRetries: {
      type: Number,
      default: DEFAULT_RETRIES,
      min: 0,
    },

    nextRetryAt: {
      type: Date,
      default: null,
    },

    workerId: {
      type: String,
      default: null,
    },

    startedAt: {
      type: Date,
      default: null,
    },

    completedAt: {
      type: Date,
      default: null,
    },

    lastError: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

jobSchema.index({
  state: 1,
  nextRetryAt: 1,
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
