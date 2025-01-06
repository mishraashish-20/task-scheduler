const express = require('express');
const taskRoutes = require('./routes/taskRoutes');
const sequelize = require('./config/database');
const logger = require('./utils/logger');

const app = express();
app.use(express.json()); // For parsing application/json

// Use routes
app.use('/api', taskRoutes);

// Handle DB connection errors


module.exports = app;
