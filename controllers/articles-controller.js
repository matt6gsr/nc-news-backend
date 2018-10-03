const { Article, Comments } = require('../models');

const getArticles = (req, res, next) => {
  Article.find()
    .populate('created_by', '-__v')
    .then(articles => {
      // @ts-ignore
      return Promise.all([
        articles,
        ...articles.map(article => {
          const commentCount = Comments.count({
            belongs_to: article._id
          });
          return commentCount;
        })
      ]);
    })
    .then(([articles, ...commentCount]) => {
      return Promise.all([
        articles.map((article, index) => {
          return {
            ...article._doc,
            comments: commentCount[index]
          };
        })
      ])
        .then(([newArticles]) => {
          res.status(200).send(newArticles);
        })
        .catch(next);
    });
};

const getArticleById = (req, res, next) => {
  Comments.count({ belongs_to: req.params.article_id })
    .then(commentCount => {
      if (!commentCount || commentCount < 0) {
        throw { status: 404 };
      } else
        return Promise.all([
          Article.findById(req.params.article_id, '-__v').populate(
            'created_by'
          ),
          commentCount
        ]);
    })
    .then(([articleOne, commentCount]) => {
      const article = { ...articleOne._doc, commentCount };
      if (!article) {
        throw { msg: 'Article Not Found', status: 404 };
      } else res.status(200).send({ article });
    })
    .catch(next);
};

const getCommentsForArticle = (req, res, next) => {
  Article.findById(req.params.article_id, '-__v')
    .populate('created_by')
    .then(article => {
      if (!article) {
        throw { msg: 'Article Not Found', status: 404 };
      } else
        return Comments.find({ belongs_to: req.params.article_id }, '-__v')
          .populate('created_by', '-__v')
          .populate('belongs_to', '-__v');
    })
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

const postCommentToArticle = (req, res, next) => {
  const { article_id } = req.params;
  const newComment = req.body;
  newComment.belongs_to = article_id;
  Article.findOne({ _id: article_id })
    .populate('created_by', '-__v')
    .then(article => {
      if (!article) {
        throw { msg: 'Article  Not Found', status: 404 };
      } else return Comments.create(newComment);
    })
    .then(comment => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

const rateArticle = (req, res, next) => {
  Article.findByIdAndUpdate(
    req.params.article_id,
    {
      $inc: {
        votes: req.query.vote === 'up' ? 1 : req.query.vote === 'down' ? -1 : 0
      }
    },
    { new: true }
  )
    .then(article => {
      if (!article) {
        throw { msg: 'Article Not Found', status: 404 };
      } else res.status(200).send({ article, message: 'Vote Taken' });
    })
    .catch(next);
};

module.exports = {
  getArticles,
  getArticleById,
  getCommentsForArticle,
  postCommentToArticle,
  rateArticle
};
