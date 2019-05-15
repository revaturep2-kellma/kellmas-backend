require('dotenv').config();

const Sequelize = require('sequelize');
const DB_NAME = process.env.DB_NAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;

console.log(DB_HOST);

const db = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  dialect: 'postgres',
  host: DB_HOST,
  dialectOptions: {
    ssl: true
  }
});

module.exports = db;