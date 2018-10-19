const { Topic, Article } = require('../models');

const getTopics = (req, res, next) => {
  Topic.find(null, '-__v')
    .then(topics => {
      res.status(200).send({ topics });
    })
    .catch(next);
};

const getTopicArticles = (req, res, next) => {
  Article.find({ belongs_to: req.params.topic_slug }, '-__v')
    .populate('created_by', ' -__v')
    .then(articles => {
      if (articles.length === 0) throw { msg: 'Topic Not Found', status: 404 };
      else res.status(200).send({ articles });
    })
    .catch(next);
};

const postArticleToTopic = (req, res, next) => {
  const { topic_slug } = req.params;
  const newArticle = req.body;
  newArticle.belongs_to = topic_slug;
  return Topic.findOne({ slug: topic_slug })
    .populate('created_by', '-__v')
    .then(articleMatch => {
      if (!articleMatch) {
        throw { msg: 'Topic not found, cannot post', status: 404 };
      } else return Article.create(newArticle);
    })
    .then(article => {
      res.status(201).send({ article });
    })
    .catch(next);
};

module.exports = { getTopics, getTopicArticles, postArticleToTopic };
