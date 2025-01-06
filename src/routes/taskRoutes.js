const express = require('express');
const { createTask, getTasks, getTaskById, updateTask, deleteTask } = require('../controllers/taskController');

const router = express.Router();

router.post('/tasks', createTask);
router.get('/tasks', getTasks);
router.get('/tasks/:id', getTaskById);  // Add the endpoint for fetching a task by ID
router.put('/tasks/:id', updateTask);   // Corrected to use 'updateTask'
router.delete('/tasks/:id', deleteTask);

module.exports = router;
