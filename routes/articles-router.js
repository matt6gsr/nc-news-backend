const articlesRouter = require('express').Router();

const {
  getArticles,
  getArticleById,
  getCommentsForArticle,
  postCommentToArticle,
  rateArticle
} = require('../controllers/articles');

articlesRouter.route('/').get(getArticles);

articlesRouter
  .route('/:article_id')
  .get(getArticleById)
  .patch(rateArticle);

articlesRouter
  .route('/:article_id/comments')
  .get(getCommentsForArticle)
  .post(postCommentToArticle);

module.exports = articlesRouter;
