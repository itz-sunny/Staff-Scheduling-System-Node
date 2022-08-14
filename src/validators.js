const Joi = require('@hapi/joi');
const { ROLES } = require('./constants');

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(8).max(20).required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).max(20).required(),
  });
  return schema.validate(data);
};

const userUpdateValidation = (data) => {
  const schema = Joi.object({
    userId: Joi.number().integer().required(),
    name: Joi.string().min(6),
    email: Joi.string().email(),
    password: Joi.string().min(8).max(20),
  });
  return schema.validate(data);
};

const roleUpdateValidation = (data) => {
  const schema = Joi.object({
    userId: Joi.number().integer().required(),
    role: Joi.string()
      .required()
      .valid(...[ROLES.admin, ROLES.staff]),
  });
  return schema.validate(data);
};

const idValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number().integer().required(),
  });
  return schema.validate(data);
};

const createScheduleValidation = (data) => {
  const schema = Joi.object({
    userId: Joi.number().integer().required(),
    workDate: Joi.date().required(),
    shiftHours: Joi.number().integer().min(1).max(24).required(),
  });
  return schema.validate(data);
};

const fetchSchedulesByUserIdValidation = (data) => {
  const schema = Joi.object({
    userId: Joi.number().integer().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
  });
  return schema.validate(data);
};

const fetchAllSchedulesValidation = (data) => {
  const schema = Joi.object({
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
  });
  return schema.validate(data);
};

const updateScheduleValidation = (data) => {
  const schema = Joi.object({
    scheduleId: Joi.number().integer().required(),
    userId: Joi.number().integer(),
    workDate: Joi.date(),
    shiftHours: Joi.number().integer(),
  });
  return schema.validate(data);
};

const fetchAllUsersSortedValidation = (data) => {
  const schema = Joi.object({
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
  });
  return schema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
  userUpdateValidation,
  roleUpdateValidation,
  idValidation,
  createScheduleValidation,
  fetchSchedulesByUserIdValidation,
  fetchAllSchedulesValidation,
  updateScheduleValidation,
  fetchAllUsersSortedValidation,
};
