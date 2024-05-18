const sequelize = require('../config/connection');
const { User, Posts, Comments } = require('../models');

// Need to add routes
const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
  
    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    }); 
    console.log('\n----- USER DATA SYNCED -----\n')
  
    await Posts.bulkCreate(postData, {}); 
    console.log('\n----- POST DATA SYNCED -----\n')

    await Comments.bulkCreate(commentData, {}); 
    console.log('\n----- COMMENTS DATA SYNCED -----\n')
  
    process.exit(0);
  };
  
  seedDatabase();