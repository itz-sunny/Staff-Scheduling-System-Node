const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { ROLES } = require('../constants');
const config = require('../../config/config.json');

const authenticate = async (req, res, next) => {
  let bearerToken = _.get(req, ['headers', 'authorization']);

  if (!bearerToken)
    return res.status(401).send({ message: 'Authentication token not found' });

  if (!bearerToken.startsWith('Bearer '))
    return res.status(401).send({ message: 'Invalid authentication token' });

  bearerToken = bearerToken.slice(7, bearerToken.length);

  jwt.verify(bearerToken, config.JWT_SECRET, (error, data) => {
    if (error)
      return res.status(401).send({ message: 'Invalid authentication token' });

    req.userId = data.userId;
    req.role = data.role;
  });

  next();
};

const authorizeAdmin = async (req, res, next) => {
  if (req.role === ROLES.admin) {
    next();
  } else {
    res.status(403).send({ message: 'Not enough permissions' });
  }
};

module.exports = {
  authenticate,
  authorizeAdmin,
};
