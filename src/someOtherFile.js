const taskQueue = require('./queues/taskQueue');
const { v4: uuidv4 } = require('uuid');

// Add a task to the queue
taskQueue.add({ taskId: uuidv4() })
  .then(() => console.log('Task added to the queue'))
  .catch((err) => console.error('Error adding task to the queue:', err));