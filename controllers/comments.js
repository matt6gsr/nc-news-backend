const { Comments } = require('../models');

const deleteComment = (req, res, next) => {
  Comments.findByIdAndRemove(req.params.comment_id)
    .then(comment => {
      if (!comment) {
        throw { msg: 'Comment Not Found', status: 404 };
      } else
        res
          .status(200)
          .send({ comment, message: 'Comment Removed Successfully' });
    })
    .catch(next);
};

const rateComment = (req, res, next) => {
  Comments.findByIdAndUpdate(
    req.params.comment_id,
    {
      $inc: {
        votes: req.query.vote === 'up' ? 1 : req.query.vote === 'down' ? -1 : 0
      }
    },
    { new: true }
  )
    .then(comment => {
      if (!comment) {
        throw { msg: 'Comment Not Found', status: 404 };
      } else res.status(200).send({ comment, message: 'Vote Taken' });
    })
    .catch(next);
};

module.exports = { deleteComment, rateComment };
