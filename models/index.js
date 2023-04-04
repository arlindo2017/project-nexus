const { User, Post, Answer, Tag } = require('./models');


User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
});

User.hasMany(Answer, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
});

Answer.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
});

Post.hasMany(Answer, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

Answer.belongsTo(Post, {
  foreignKey: 'post_id',
});

Post.hasOne(Tag, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

Tag.belongsTo(Post, {
  foreignKey: 'tag_id',
  onDelete: 'SET NULL'
});

module.exports = { User, Project };
