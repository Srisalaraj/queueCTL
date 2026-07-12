export const JOB_STATE = {
  PENDING: "pending",
  PROCESSING: "processing",
  COMPLETED: "completed",
  FAILED: "failed",
  DEAD: "dead",
};

export const WORKER_STATE = {
  RUNNING: "running",
  STOPPED: "stopped",
};

export const DEFAULT_RETRIES = 3;

export const BACKOFF_BASE = 2;

export const POLLING_INTERVAL = 2000;

export const HEARTBEAT_INTERVAL = 5000;

export const HEARTBEAT_TIMEOUT = 30000;