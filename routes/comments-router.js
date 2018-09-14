const commentsRouter = require('express').Router();

const { deleteComment, rateComment } = require('../controllers/comments');

commentsRouter
  .route('/:comment_id')
  .delete(deleteComment)
  .patch(rateComment);

module.exports = commentsRouter;
