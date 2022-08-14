const {
  loginValidation,
  registerValidation,
  roleUpdateValidation,
  userUpdateValidation,
  idValidation,
  fetchAllUsersSortedValidation,
} = require('../validators.js');
const {
  fetchUserForAuthentication,
  emailExists,
  createUser,
  updateRoleByUserId,
  deleteUserById,
  _updateUser,
  fetchUserById,
  _fetchAllUsers,
  _fetchAllUsersSorted,
} = require('../db/repositories/user.js');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../../config/config.json');
const moment = require('moment');
const { isWithin1Year } = require('../utils/dateUtils.js');

const register = async (req, res) => {
  try {
    const { error } = registerValidation(req.body);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const isEmailExists = await emailExists(_.get(req, ['body', 'email']));

    if (isEmailExists)
      return res.status(409).send({ message: 'email is already registered' });

    const result = await createUser(req.body);

    return res.status(201).send(result);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { error } = loginValidation(req.body);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await fetchUserForAuthentication(
      _.get(req, ['body', 'email']),
    );

    if (!user) {
      return res.status(400).send({ message: 'user does not exist' });
    }

    const isValidPassword = bcrypt.compareSync(
      _.get(req, ['body', 'password']),
      user.password,
    );

    if (!isValidPassword) {
      return res.status(400).send({ message: 'email or password wrong' });
    }

    const role = _.get(user, ['userRole', 'role']);

    const authToken = jwt.sign(
      {
        userId: user.id,
        role,
      },
      config.JWT_SECRET,
      {
        expiresIn: config.JWT_TOKEN_TTL,
      },
    );

    return res.status(200).send({
      id: user.id,
      role,
      accessToken: authToken,
      issuedAt: moment(),
      expiresAt: moment().add(config.JWT_TOKEN_TTL),
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const updateRole = async (req, res) => {
  try {
    const { error } = roleUpdateValidation(req.body);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const result = await updateRoleByUserId(req.body);
    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { error } = userUpdateValidation(req.body);

    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const result = await _updateUser(req.body);
    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { error } = idValidation({ id: _.get(req, ['params', 'userId']) });

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const result = await deleteUserById(_.get(req, ['params', 'userId']));
    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const fetchUser = async (req, res) => {
  try {
    const { error } = idValidation({ id: _.get(req, ['body', 'userId']) });

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const result = await fetchUserById(_.get(req, ['body', 'userId']));
    return _.isEmpty(result)
      ? res.status(404).send({})
      : res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const fetchAllUsers = async (req, res) => {
  try {
    const result = await _fetchAllUsers();
    return _.isEmpty(result)
      ? res.status(404).send({})
      : res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const fetchAllUsersSorted = async (req, res) => {
  try {
    const request = {
      startDate: _.get(req, ['query', 'startDate']),
      endDate: _.get(req, ['query', 'endDate']),
    };

    const { error } = fetchAllUsersSortedValidation(request);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const filter = isWithin1Year(
      _.get(request, ['startDate']),
      _.get(request, ['endDate']),
    );

    if (!filter) {
      return res.status(400).send({
        message:
          'difference between start date and end date must be less than 1 year',
      });
    } else {
      request.filter = filter;
    }

    const result = await _fetchAllUsersSorted(request);
    return _.isEmpty(result)
      ? res.status(404).send({})
      : res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = {
  register,
  login,
  updateRole,
  updateUser,
  deleteUser,
  fetchUser,
  fetchAllUsers,
  fetchAllUsersSorted,
};
