const { Sequelize } = require('sequelize');
require('dotenv').config();

// Setting up the Sequelize instance with PostgreSQL connection
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // Disable logging in production
});

module.exports = sequelize;
