const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LogActivity = sequelize.define('LogActivity', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  action: {
    type: DataTypes.STRING(30), // create, update, delete
    allowNull: false
  },
  entity: {
    type: DataTypes.STRING,
    allowNull: false
  },
  entity_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  details: {
    type: DataTypes.JSON,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('success', 'failure'),
    allowNull: false
  },
  error_message: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  ip_address: {
    type: DataTypes.STRING(32),
    allowNull: false
  },
  user_agent: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  module: {
    type: DataTypes.STRING,
    allowNull: true
  },
  request_method: {
    type: DataTypes.STRING,
    allowNull: true
  },
  url_accessed: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'log_activities',
  timestamps: true
});

module.exports = LogActivity;
