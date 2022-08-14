const _ = require('lodash');
const bcrypt = require('bcrypt');
const {
  Role,
  User,
  Schedule,
  sequelize,
  Sequelize,
} = require('../models/index.js');
const { ROLES } = require('../../constants.js');

const emailExists = async (email) => {
  try {
    const emailExists = User.findOne({
      attributes: ['id'],
      where: {
        email,
        deleted: false,
      },
    });

    return emailExists;
  } catch (err) {
    console.error(`Error in checking if email: ${email} already exists`, err);
    throw err;
  }
};

const createUser = async (user) => {
  try {
    const { name, email, password } = user;

    const result = await sequelize.transaction(async (transaction) => {
      const createdUser = await User.create(
        {
          ...user,
          password: bcrypt.hashSync(password, 8),
        },
        { transaction },
      );

      if (!createdUser) throw Error('Error in inserting user');

      await Role.create(
        {
          userId: createdUser.id,
          role: ROLES.staff,
        },
        { transaction },
      );

      return { userId: createdUser.id, name, email, role: ROLES.staff };
    });

    return result;
  } catch (err) {
    console.error(`Error in creating user for email: ${user.email}`, err);
    throw err;
  }
};

const updateRoleByUserId = async (request) => {
  const { userId, role } = request;
  try {
    const result = await Role.update(
      { role },
      {
        where: {
          userId,
        },
      },
    );

    return result && result[0] > 0;
  } catch (err) {
    console.error(`Error in updating role for request: ${request}`, err);
    throw err;
  }
};

const _updateUser = async (request) => {
  const { userId, email, password, name } = request;
  try {
    const update = {};
    if (email) update.email = email;

    if (password) update.password = bcrypt.hashSync(password, 8);

    if (name) update.name = name;

    const result = await User.update(update, {
      where: {
        id: userId,
        deleted: false,
      },
    });
    return result && result[0] > 0;
  } catch (err) {
    console.error(
      `Error in updating user for request: ${JSON.stringify(request)}`,
      err,
    );
    throw err;
  }
};

const deleteUserById = async (userId) => {
  try {
    const result = await sequelize.transaction(async (transaction) => {
      let update = await User.update(
        { deleted: true },
        {
          where: {
            id: userId,
          },
        },
      );

      if (!update || update[0] == 0)
        throw Error('Failed to update deleted flag for user');

      update = await Schedule.update(
        { deleted: true },
        {
          where: {
            userId,
          },
        },
      );

      if (!update || update[0] == 0)
        throw Error('Failed to update deleted flag for schedules');

      return true;
    });

    return result;
  } catch (err) {
    console.error(`Error in deleting user for userId: ${userId}`, err);
    throw err;
  }
};

const fetchUserById = async (id) => {
  try {
    const result = await User.findOne({
      where: {
        id,
        deleted: false,
      },
      raw: true,
      include: [
        {
          model: Role,
          as: 'userRole',
          attributes: ['role'],
          required: true,
        },
      ],
      attributes: {
        exclude: ['password'],
      },
    });

    return {
      id: result.id,
      name: result.name,
      email: result.email,
      role: result['userRole.role'],
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  } catch (err) {
    console.error(`Error in fetching user for userId: ${id}`, err);
    throw err;
  }
};

const _fetchAllUsers = async () => {
  try {
    let result = await User.findAll({
      where: {
        deleted: false,
      },
      raw: true,
      include: [
        {
          model: Role,
          as: 'userRole',
          attributes: ['role'],
          required: true,
        },
      ],
    });

    result = _.map(result, (user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user['userRole.role'],
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    });

    return result;
  } catch (err) {
    console.error(`Error in fetching all users`, err);
    throw err;
  }
};

const fetchRoleByUserId = async (userId) => {
  try {
    const result = await Role.findOne({
      where: {
        userId,
      },
      attributes: ['role'],
    });
    return _.get(result.role, ROLES.staff);
  } catch (err) {
    console.error(`Error in fetching user for userId: ${id}`, err);
    throw err;
  }
};

const fetchUserForAuthentication = async (email) => {
  try {
    const result = await User.findOne({
      where: {
        email,
        deleted: false,
      },
      attributes: ['password', 'id'],
      include: {
        model: Role,
        as: 'userRole',
        attributes: ['role'],
        required: true,
      },
    });

    return result;
  } catch (err) {
    console.error(`Error in fetching user for email: ${email}`, err);
    throw err;
  }
};

const _fetchAllUsersSorted = async (request) => {
  try {
    const { filter } = request;

    let result = await User.findAll({
      where: {
        deleted: false,
      },
      attributes: ['id', 'name', 'email', 'created_at', 'updated_at'],
      raw: true,
      include: [
        {
          model: Role,
          as: 'userRole',
          attributes: ['role'],
          required: true,
        },
        {
          model: Schedule,
          as: 'schedule',
          attributes: [
            [
              sequelize.fn('sum', sequelize.col('shift_hours')),
              'total_shift_hours',
            ],
          ],
          where: {
            createdAt: {
              [Sequelize.Op.between]: filter,
            },
          },
          group: ['schedule.userId'],
        },
      ],
      order: [[sequelize.literal('`schedule.total_shift_hours`'), 'DESC']],
      group: ['id', 'userRole.role'],
      having: { 'schedule.total_shift_hours': { [Sequelize.Op.ne]: null } },
    });

    result = _.map(result, (user) => {
      return {
        userId: user.id,
        name: user.name,
        email: user.email,
        role: user['userRole.role'],
        totalShiftHours: user['schedule.total_shift_hours'],
        createdAt: user.created_at,
        updatedAt: user.updated_at,
      };
    });

    return result;
  } catch (err) {
    console.error(`Error in fetching all users`, err);
    throw err;
  }
};

module.exports = {
  emailExists,
  createUser,
  updateRoleByUserId,
  _updateUser,
  deleteUserById,
  fetchUserById,
  _fetchAllUsers,
  fetchRoleByUserId,
  fetchUserForAuthentication,
  _fetchAllUsersSorted,
};
