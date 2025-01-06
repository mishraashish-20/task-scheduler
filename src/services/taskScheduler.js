const Queue = require('bull');
const Task = require('../models/taskModel');
const logger = require('../utils/logger');

const taskQueue = new Queue('taskQueue', process.env.REDIS_URL);

taskQueue.process(async (job) => {
  console.log("job",job);
  
  const task = await Task.findOne(job.data.id);
  if (!task) throw new Error('Task not found');

  try {
    // Simulate task execution
    logger.info(`Executing task: ${task.id}`);
    task.status = 'completed';
    await task.save();
  } catch (error) {
    logger.error(`Error executing task: ${task.id} - ${error.message}`);
    task.retryCount += 1;
    task.status = 'failed';
    await task.save();
    throw error;
  }
});

module.exports = { taskQueue };
