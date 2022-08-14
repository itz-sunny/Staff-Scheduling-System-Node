const _ = require('lodash');
const {
  idValidation,
  fetchSchedulesByUserIdValidation,
  fetchAllSchedulesValidation,
  createScheduleValidation,
  updateScheduleValidation,
} = require('../validators.js');
const {
  _fetchScheduleById,
  _fetchScheduleByUserId,
  _fetchAllSchedules,
  _updateSchedule,
  _createSchedule,
  _deleteAllSchedulesByUserId,
  _deleteScheduleById,
} = require('../db/repositories/schedule.js');
const { isWithin1Year } = require('../utils/dateUtils.js');
const { ROLES } = require('../constants.js');

const createSchedule = async (req, res) => {
  try {
    const { error } = createScheduleValidation(req.body);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const result = await _createSchedule(req.body);
    return res.status(201).send(result);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const fetchScheduleById = async (req, res) => {
  try {
    const scheduleId = _.get(req, ['params', 'scheduleId']);

    const { error } = idValidation({ id: scheduleId });

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const result = await _fetchScheduleById(scheduleId);

    if (
      req.role === ROLES.staff &&
      _.get(result, ['user', 'role']) === ROLES.admin
    )
      result = {};

    return _.isEmpty(result)
      ? res.status(404).send({})
      : res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const fetchScheduleByUserIdSelf = async (req, res) => {
  try {
    const request = {
      userId: _.get(req, ['userId']),
      startDate: _.get(req, ['query', 'startDate']),
      endDate: _.get(req, ['query', 'endDate']),
    };

    const { error } = fetchSchedulesByUserIdValidation(request);

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

    const result = await _fetchScheduleByUserId(request);

    return _.isEmpty(result)
      ? res.status(404).send([])
      : res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const fetchScheduleByUserId = async (req, res) => {
  try {
    const request = {
      userId: _.get(req, ['params', 'userId']),
      startDate: _.get(req, ['query', 'startDate']),
      endDate: _.get(req, ['query', 'endDate']),
    };

    const { error } = fetchSchedulesByUserIdValidation(request);

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

    const result = await _fetchScheduleByUserId(request);

    if (req.role === ROLES.staff) {
      result = _.filter(result, (schedule) =>
        _.get(schedule, ['user', 'role'] === ROLES.admin),
      );
    }

    return _.isEmpty(result)
      ? res.status(404).send([])
      : res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const fetchAllSchedules = async (req, res) => {
  try {
    const request = {
      startDate: _.get(req, ['query', 'startDate']),
      endDate: _.get(req, ['query', 'endDate']),
    };

    const { error } = fetchAllSchedulesValidation(request);

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

    const result = await _fetchAllSchedules(request);

    if (req.role === ROLES.staff) {
      result = _.filter(result, (schedule) =>
        _.get(schedule, ['user', 'role'] === ROLES.admin),
      );
    }

    return _.isEmpty(result)
      ? res.status(404).send([])
      : res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const updateSchedule = async (req, res) => {
  try {
    const { error } = updateScheduleValidation(req.body);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const result = await _updateSchedule(req.body);
    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const deleteAllSchedulesByUserId = async (req, res) => {
  try {
    const { error } = idValidation({ id: _.get(req, ['params', 'userId']) });

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const result = await _deleteAllSchedulesByUserId(
      _.get(req, ['params', 'userId']),
    );
    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const deleteScheduleById = async (req, res) => {
  try {
    const { error } = idValidation({
      id: _.get(req, ['params', 'scheduleId']),
    });

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const result = await _deleteScheduleById(
      _.get(req, ['params', 'scheduleId']),
    );
    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = {
  createSchedule,
  fetchScheduleById,
  fetchScheduleByUserIdSelf,
  fetchScheduleByUserId,
  fetchAllSchedules,
  updateSchedule,
  deleteAllSchedulesByUserId,
  deleteScheduleById,
};
