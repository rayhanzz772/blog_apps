const sequelize = require('../config/database');

const User = require('./User');
const Post = require('./Post');
const Tag = require('./Tag');
const Category = require('./Category');
const PostTag = require('./PostTag');
const PostActivity = require('./PostActivity');
const LogActivity = require('./LogActivity');

// 1 User => banyak Post
User.hasMany(Post, { foreignKey: 'user_id' });
Post.belongsTo(User, { foreignKey: 'user_id' });

// 1 Category => banyak Post
Category.hasMany(Post, { foreignKey: 'category_id' });
Post.belongsTo(Category, { foreignKey: 'category_id' });

Post.hasMany(PostActivity, { foreignKey: 'post_id' });
PostActivity.belongsTo(Post, { foreignKey: 'post_id' });

// Logging
User.hasMany(LogActivity, { foreignKey: 'user_id' });
LogActivity.belongsTo(User, { foreignKey: 'user_id' });

// Many-to-Many: Post <-> Tag
Post.belongsToMany(Tag, {
  through: PostTag,
  foreignKey: 'post_id',
  otherKey: 'tag_id'
});
Tag.belongsToMany(Post, {
  through: PostTag,
  foreignKey: 'tag_id',
  otherKey: 'post_id'
});

module.exports = {
  sequelize,
  User,
  Post,
  Tag,
  Category,
  PostTag
};
