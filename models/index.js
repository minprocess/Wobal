const User = require('./User');
const Posts = require('./Posts');
const Comments = require('./Posts')

User.hasMany(Posts, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Posts.belongsTo(User, {
  foreignKey: 'user_id'
});

Posts.hasMany(Comments, {
  foreignKey: "user_id",
});

Comments.belongsTo(Posts, {
  foreignKey: 'id'
});

module.exports = { User, Posts, Comments };
