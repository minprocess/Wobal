const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
var badwordsArray = require('badwords/array');


class Posts extends Model {}

Posts.init(
  {
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newPostsData) => {
        const newPostArray = (((newPostsData.dataValues.description)).split(' ')).map(v => v.toLowerCase());
        const actualArray = (((newPostsData.dataValues.description)).split(' '))
        for (let i = 0; i < badwordsArray.length; i++) {
          for (let a = 0; a < newPostArray.length; a++){
            if(badwordsArray.includes((newPostArray[a]))) {
              const badWordIndex = badwordsArray.indexOf(newPostArray[a])
              const badWord = badwordsArray[badWordIndex]
              const badWordLength = badWord.length
              const newPostIndex = newPostArray.indexOf(badWord)
              actualArray[newPostIndex] = '*'.repeat(eval(badWordLength))
              newPostsData.dataValues.description = actualArray.join(' ')
              console.log(`\n\n ${badWord} \n\n`);
              }
            }
          }
          return newPostsData
      }, 
    },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'posts',
  },
);

module.exports = Posts;
