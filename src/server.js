// src/server.js
const express = require('express');
const taskRoutes = require('./routes/taskRoutes');
const taskQueue = require ('./queues/taskQueue');  // Import the queue
const sequelize = require('./config/database');
const logger = require('./utils/logger')
const app = express();

app.use(express.json());
sequelize.authenticate()
  .then(() => {
    logger.info('Database connection established');
  })
  .catch((error) => {
    logger.error('Error connecting to the database:', error);
  });
app.use('/api', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Start the queue to process tasks
taskQueue
  .on('completed', (job, result) => {
    console.log(`Task completed: ${result.name}`);
  })
  .on('failed', (job, err) => {
    console.error(`Task failed: ${err.message}`);
  });
