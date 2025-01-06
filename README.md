# Task Scheduler

A distributed task scheduling system built with Node.js, Bull, Redis, and Sequelize.

## Features
- Schedule tasks for execution at specific times.
- Reliable task processing with retry mechanisms.
- Integration with Redis for job queue management.
- Logs task execution and stores history in a database.

## Folder Structure
```plaintext
task-scheduler/
├── src/
│   ├── config/            # Database configuration
│   ├── controllers/       # Task-related controllers
│   ├── models/            # Sequelize models
│   ├── routes/            # API routes
│   ├── workers/           # Background workers
│   ├── utils/             # Utilities like logger
│   ├── app.js             # Application setup
│   └── server.js          # Server initialization
├── migrations/            # Sequelize migrations
├── .env                   # Environment variables (ignored in Git)
├── .eslintrc.json         # ESLint configuration
├── package.json           # Project dependencies
└── README.md              # Project documentation


Prerequisites
Node.js
Redis
Sequelize CLI (for migrations)


## Getting Started
1.Install dependencies: npm install
2.Start Redis.
3.Start the worker and server: npx nodemon src/workers/taskWorker.js && node src/server.js


