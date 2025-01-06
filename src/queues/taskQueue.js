const Queue = require('bull');

// Create the Bull queue for task scheduling
const taskQueue = new Queue('taskQueue', {
  redis: { host: 'localhost', port: 6379 },  // Ensure Redis is running on the given host and port
});

module.exports = taskQueue;
