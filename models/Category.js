const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('Category', {
name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  paranoid: true,
  timestamps: true
});

module.exports = Category;