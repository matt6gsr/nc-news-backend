const topicsRouter = require('express').Router();

const {
  getTopics,
  getTopicArticles,
  postArticleToTopic
} = require('../controllers/topics');

topicsRouter.route('/').get(getTopics);

topicsRouter
  .route('/:topic_slug/articles')
  .get(getTopicArticles)
  .post(postArticleToTopic);

module.exports = topicsRouter;
