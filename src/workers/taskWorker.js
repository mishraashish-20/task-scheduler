// const taskQueue = require('../queues/taskQueue');
// const logger = require('../utils/logger');
// const Task  = require('../models/task');

// // Process jobs from the queue
// taskQueue.process(async (job) => {
//   const { taskId } = job.data;
//   try {
//     const task = await Task.findByPk(taskId);
//     if (!task) throw new Error('Task not found');

//     // Log task execution
//     logger.info(`Task ${task.name} is being executed`);

//     // Simulate task execution
//     task.status = 'in-progress';
//     await task.save();

//     // Simulate task completion
//     task.status = 'completed';
//     await task.save();

//     logger.info(`Task ${task.name} completed successfully`);

//     return task;
//   } catch (error) {
//     logger.error(`Error executing task: ${error.message}`);
//     throw error;
//   }
// });

// taskQueue.add({ taskId: 1 });


const taskQueue = require('../queues/taskQueue');
const logger = require('../utils/logger');
const Task = require('../models/task');
const { v4: uuidv4 } = require('uuid'); // Import UUID generation

// Process jobs from the queue
taskQueue.process(async (job) => {
  const { taskId } = job.data;
  try {
    const task = await Task.findByPk(taskId);
    if (!task) throw new Error('Task not found');

    // Log task execution
    logger.info(`Task ${task.name} is being executed`);

    // Simulate task execution
    task.status = 'in-progress';
    await task.save();

    // Simulate task completion
    task.status = 'completed';
    await task.save();

    logger.info(`Task ${task.name} completed successfully`);

    return task;
  } catch (error) {
    logger.error(`Error executing task: ${error.message}`);
    throw error;
  }
});
