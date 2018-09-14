const momngoose = require('mongoose');
const { Topic, User, Article, Comments } = require('../models');
const { formatArticleData, formatCommentData } = require('../utils');

const seedDB = ({ topicData, userData, articleData, commentData }) => {
  return momngoose.connection
    .dropDatabase()
    .then(() => {
      return Promise.all([
        Topic.insertMany(topicData),
        User.insertMany(userData)
      ]);
    })
    .then(([topicsDocs, userDocs]) => {
      return Promise.all([
        userDocs,
        topicsDocs,
        Article.insertMany(formatArticleData(articleData, topicData, userDocs))
      ]);
    })
    .then(([userDocs, topicDocs, articleDocs]) => {
      return Promise.all([
        articleDocs,
        Comments.insertMany(
          formatCommentData(commentData, userDocs, articleDocs)
        ),
        topicDocs,
        userDocs
      ]);
    })
    .catch(console.log);
};

module.exports = seedDB;
