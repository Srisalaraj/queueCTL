# QueueCTL - Background Job Queue CLI

A production-style Background Job Queue CLI built using **Node.js**, **MongoDB**, and **Commander.js**.

The application allows users to enqueue shell commands, process them using background workers, retry failed jobs using exponential backoff, manage dead letter queues (DLQ), and monitor worker status.

---

## Features

- Enqueue shell commands
- Background worker processing
- Atomic job claiming using MongoDB
- Retry failed jobs
- Dead Letter Queue (DLQ)
- Worker heartbeat monitoring
- Worker registration
- Worker stop command
- Queue status command
- Crash recovery
- Graceful shutdown
- Configurable application settings

---

## Tech Stack

- Node.js (ES6 Modules)
- MongoDB
- Mongoose
- Commander.js
- UUID

---

## Folder Structure

```
queuectl
│
├── commands
├── config
├── controllers
├── models
├── services
├── utils
├── cli.js
├── app.js
└── package.json
```

---

## Installation

Clone the repository

```bash
git clone <repository-url>

cd queuectl
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
MONGO_URI=mongodb://127.0.0.1:27017/queuectl
PORT=3000
```

Run the application

```bash
queuectl --help
```

or

```bash
npm start
```

---

## Available Commands

### Enqueue a Job

```bash
queuectl enqueue --command "echo Hello"
```

---

### Start Worker

```bash
queuectl worker start
```

---

### Stop Worker

```bash
queuectl worker stop <workerId>
```

---

### Queue Status

```bash
queuectl status
```

---

### Dead Letter Queue

List dead jobs

```bash
queuectl dlq list
```

Retry a dead job

```bash
queuectl dlq retry <jobId>
```

---

### Configuration

```bash
queuectl config set retries 5

queuectl config get retries

queuectl config list
```

---

## Architecture

```
CLI

↓

Controller

↓

Service

↓

MongoDB
```

The application follows the MVC architecture.

---

## Author

Raj Kumar

Backend Developer
