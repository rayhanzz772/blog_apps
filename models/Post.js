const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING(200),
    allowNull: false,
    unique: true
  },
  slug: {
    type: DataTypes.STRING(200),
    allowNull: false,
    unique: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  thumbnail: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('publish', 'draft'),
    defaultValue: 'draft'
  },
  published_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  meta_title: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  meta_description: {
    type: DataTypes.STRING(150),
    allowNull: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // harus sama dengan nama table
      key: 'id'
    }
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categories',
      key: 'id'
    }
  }
}, {
  tableName: 'posts',
  timestamps: true,
  paranoid: true
});

module.exports = Post;
