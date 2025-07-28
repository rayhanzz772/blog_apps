const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PostTag = sequelize.define('PostTag', {
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tag_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'post_tag',
  timestamps: false
});

module.exports = PostTag;
