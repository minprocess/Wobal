const User = require('./User');
const Posts = require('./Posts');
const Comments = require('./Comments')

User.hasMany(Posts, {
  onDelete: 'CASCADE'
});

Posts.belongsTo(User);

Posts.hasMany(Comments, {
  onDelete: 'CASCADE'
});

Comments.belongsTo(Posts);

User.hasMany(Comments, {
  onDelete: 'CASCADE'
})

Comments.belongsTo(User);

module.exports = { User, Posts, Comments };