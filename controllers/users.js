const { User } = require('../models');

const getUserByUsername = (req, res, next) => {
  User.findOne({ username: req.params.username }, '-__v')
    .then(user => {
      if (!user) {
        throw { msg: 'User Not Found', status: 404 };
      } else res.status(200).send({ user });
    })
    .catch(next);
};

module.exports = { getUserByUsername };
