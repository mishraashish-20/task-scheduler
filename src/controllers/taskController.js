const Task = require('../models/task');
const taskQueue = require('../queues/taskQueue');
const logger = require('../utils/logger');
const { validateTaskData, validateScheduledTime } = require('../utils/validation');


const createTask = async (req, res) => {
    try {
        const { name, scheduledTime } = req.body;
        const validationError = validateTaskData({ name, scheduledTime });
        if (validationError) {
            return res.status(400).json({ message: validationError });
        }

        const task = await Task.create({ name, scheduledTime });

        const delay = new Date(scheduledTime) - new Date();
        const timeError = validateScheduledTime(delay);
        if (timeError) {
            return res.status(400).json({ message: timeError });
        }


        await taskQueue.add({ taskId: task.id }, { delay });
        logger.info(`Task ${task.name} added to queue for execution at ${scheduledTime}`);

        res.status(201).json(task);
    } catch (error) {
        logger.error(`Error creating task: ${error.message}`);
        res.status(500).json({ message: 'Error creating task', error });
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.status(200).json(tasks);
    } catch (error) {
        logger.error(`Error fetching tasks: ${error.message}`);
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
};

const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (error) {
        logger.error(`Error fetching task by ID: ${error.message}`);
        res.status(500).json({ message: 'Error fetching task by ID', error });
    }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, scheduledTime, status } = req.body;

        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Update task details
        task.name = name || task.name;
        task.scheduledTime = scheduledTime || task.scheduledTime;
        task.status = status || task.status;

        await task.save();

        // If the scheduled time is updated, re-add it to the queue with the new delay
        if (scheduledTime) {
            const delay = new Date(scheduledTime) - new Date();
            const timeError = validateScheduledTime(delay);
            if (timeError) {
                return res.status(400).json({ message: timeError });
            }

            // Remove from queue if already added
            await taskQueue.remove(job => job.data.taskId === task.id);
            await taskQueue.add({ taskId: task.id }, { delay });
            logger.info(`Task ${task.name} updated and added to queue for execution at ${scheduledTime}`);
        }

        res.status(200).json(task);
    } catch (error) {
        logger.error(`Error updating task: ${error.message}`);
        res.status(500).json({ message: 'Error updating task', error });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Remove the task from the queue if it's in progress
        await taskQueue.remove(job => job.data.taskId === task.id);
        await task.destroy();

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        logger.error(`Error deleting task: ${error.message}`);
        res.status(500).json({ message: 'Error deleting task', error });
    }
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
