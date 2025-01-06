const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Defining the Task model
const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  scheduledTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'in-progress', 'completed', 'failed'),
    defaultValue: 'pending',
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt
  tableName: 'tasks', // Set custom table name
});

module.exports = Task;
