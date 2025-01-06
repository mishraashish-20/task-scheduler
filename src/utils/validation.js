// src/utils/validation.js

// Validate Task Data (Name and Scheduled Time)
const validateTaskData = ({ name, scheduledTime }) => {
    if (!name || name.trim().length === 0) {
      return 'Task name cannot be empty.';
    }
  
    if (!scheduledTime || isNaN(Date.parse(scheduledTime))) {
      return 'Invalid scheduled time provided.';
    }
  
    return null; // No error
  };
  
  // Validate Scheduled Time (Ensure it's in the future)
  const validateScheduledTime = (delay) => {
    if (delay <= 0) {
      return 'Scheduled time must be in the future.';
    }
  
    return null; // No error
  };
  
  // Optional: Validate Status
  const validateStatus = (status) => {
    const validStatuses = ['pending', 'in-progress', 'completed'];
    if (status && !validStatuses.includes(status)) {
      return `Status must be one of the following: ${validStatuses.join(', ')}`;
    }
    return null; // No error
  };
  
  module.exports = { validateTaskData, validateScheduledTime, validateStatus };
  