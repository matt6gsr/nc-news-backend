const commentsRouter = require('express').Router();

const {
  getComments,
  deleteComment,
  rateComment
} = require('../controllers/comments-controller');

commentsRouter.route('/').get(getComments);

commentsRouter
  .route('/:comment_id')
  .delete(deleteComment)
  .patch(rateComment);

module.exports = commentsRouter;
