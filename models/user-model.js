const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  oid: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  timestamps: false,
});

module.exports = User;