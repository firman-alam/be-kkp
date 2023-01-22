const db = require('../models');
const User = db.user;

const checkDuplicateUsername = async (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: 'Failed! Username is already in use!',
      });
      return;
    }
  });

  next();
};

module.exports = checkDuplicateUsername;
