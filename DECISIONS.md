# Design Decisions

This document explains the architectural and technical decisions made during the development of QueueCTL.

---

## Why MVC Architecture?

The project follows the MVC (Model View Controller) architecture to separate responsibilities.

- Models manage MongoDB schemas.
- Controllers handle CLI requests.
- Services contain business logic.
- Commands define CLI operations.

This makes the project easier to maintain and extend.

---

## Why MongoDB?

MongoDB provides:

- Flexible schema
- Fast document updates
- Atomic update operations
- Easy integration with Node.js

---

## Why findOneAndUpdate()?

Multiple workers may attempt to process the same job.

Using:

```javascript
findOneAndUpdate();
```

allows MongoDB to atomically:

- Find a pending job
- Mark it as processing

This prevents duplicate job execution.

---

## Why Worker Collection?

Each worker stores:

- Worker ID
- Status
- Heartbeat
- Current Job

This allows monitoring active workers and detecting crashed workers.

---

## Why Heartbeat?

Each worker updates its heartbeat every few seconds.

If the heartbeat becomes stale, the Recovery Service detects the worker as crashed and requeues unfinished jobs.

---

## Why Retry Mechanism?

Temporary failures should not immediately move a job to the Dead Letter Queue.

The retry mechanism attempts execution multiple times before marking the job as dead.

---

## Why Dead Letter Queue?

Jobs that continuously fail are moved to the DLQ.

This prevents failed jobs from blocking the queue and allows manual retry later.

---

## Why Graceful Shutdown?

When the worker receives SIGINT (Ctrl+C):

- Heartbeat stops
- Worker status changes to stopped
- Current processing finishes
- Worker exits safely

This avoids inconsistent worker state.

---

## Why Configuration System?

Configuration values such as retry count and polling interval are stored separately so they can be changed without modifying application code.

---

## Future Improvements

- Priority Queue
- Scheduled Jobs
- Web Dashboard
- Redis Support
- Docker Deployment
- REST API
- Authentication
