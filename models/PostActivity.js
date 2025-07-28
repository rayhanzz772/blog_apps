const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PostActivity = sequelize.define('PostActivity', {
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userAgent: {
    type: DataTypes.JSON,
    allowNull: false
  },
  ip: {
    type: DataTypes.STRING,
    allowNull: false
},
  timestamps: true,
  tableName: 'post_activities'
});

module.exports = PostActivity;
