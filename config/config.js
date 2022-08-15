const _ = require('lodash');
const envReader = require('../src/envReader');
const appConfig = require('./config.json');

envReader();

const get = (varName, defaultValue) => {
  return _.get(process, ['env', varName], defaultValue);
};

module.exports = {
  get,
  PORT: get('PORT', appConfig.PORT),
  JWT_TOKEN_TTL: get('JWT_TOKEN_TTL', appConfig.JWT_TOKEN_TTL),
  JWT_SECRET: get('JWT_SECRET', appConfig.JWT_SECRET),
};
