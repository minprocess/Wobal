const User = require('./User');
const Posts = require('./Posts');
const Comments = require('./Posts')

User.hasMany(Posts, {
  foreignKey: 'id',
  onDelete: 'CASCADE'
});
Posts.belongsTo(User, {
  as: 'user_posts'
});

Posts.hasMany(Comments, {
  foreignKey: "id",
});
Comments.belongsTo(Posts, {
  foreignKey: 'id'
});

module.exports = { User, Posts, Comments };