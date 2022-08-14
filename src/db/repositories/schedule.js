const { User, Schedule, Sequelize } = require('../models/index.js');
const _ = require('lodash');

const _createSchedule = async (request) => {
  try {
    const result = await Schedule.create(request);

    return result;
  } catch (err) {
    console.error('Error in creating schedule for request: {}', request, err);
    throw err;
  }
};

const _fetchScheduleById = async (id) => {
  try {
    const result = await Schedule.findOne({
      where: {
        id,
        deleted: false,
      },
      attributes: {
        exclude: ['userId'],
      },
      include: {
        model: User,
        as: 'user',
        required: true,
      },
    });

    return result;
  } catch (err) {
    console.error(`Error in fetching schedule for schedule id: ${id}`, err);
    throw err;
  }
};

const _fetchScheduleByUserId = async (request) => {
  try {
    const { userId, filter } = request;

    const result = await Schedule.findAll({
      where: {
        userId,
        deleted: false,
        createdAt: {
          [Sequelize.Op.between]: filter,
        },
      },
      attributes: {
        exclude: ['userId'],
      },
      include: {
        model: User,
        as: 'user',
        required: true,
      },
    });

    return result;
  } catch (err) {
    console.error(`Error in fetching schedule for request: ${request}`, err);
    return null;
  }
};

const _fetchAllSchedules = async (request) => {
  try {
    const { filter } = request;

    const result = await Schedule.findAll({
      where: {
        deleted: false,
        createdAt: {
          [Sequelize.Op.between]: filter,
        },
      },
      attributes: {
        exclude: ['userId'],
      },
      include: {
        model: User,
        as: 'user',
        required: true,
      },
    });

    return result;
  } catch (err) {
    console.error(`Error in fetching schedule for request: ${request}`, err);
    return null;
  }
};

const _updateSchedule = async (request) => {
  try {
    const { workDate, shiftHours, userId } = request;
    const update = {};
    if (request.workDate) update.workDate = workDate;
    if (request.shiftHours) update.shiftHours = shiftHours;
    if (request.userId) update.userId = userId;

    const result = await Schedule.update(update, {
      where: { id, deleted: false },
    });

    return result && result[0] > 0;
  } catch (err) {
    console.error(`Error in updating schedule for request: ${request}`, err);
    throw err;
  }
};

const _deleteAllSchedulesByUserId = async (userId) => {
  try {
    const result = await Schedule.update(
      { deleted: true },
      {
        where: { userId },
      },
    );

    return result && result[0] > 0;
  } catch (err) {
    console.error(`Error in deleting schedules for userId: ${userId}`, err);
    throw err;
  }
};

const _deleteScheduleById = async (id) => {
  try {
    const result = await Schedule.update(
      { deleted: true },
      {
        where: { id, deleted: false },
      },
    );

    return result && result[0] > 0;
  } catch (err) {
    console.error(`Error in deleting schedule for scheduleId: ${id}`, err);
    throw err;
  }
};

module.exports = {
  _createSchedule,
  _fetchScheduleById,
  _fetchScheduleByUserId,
  _fetchAllSchedules,
  _updateSchedule,
  _deleteAllSchedulesByUserId,
  _deleteScheduleById,
};
