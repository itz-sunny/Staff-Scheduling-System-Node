const moment = require('moment');

const isWithin1Year = (startDate, endDate) => {
  startDate = toStartOfDay(startDate);
  endDate = toEndOfDay(endDate);
  if (moment(endDate).isBefore(startDate)) return [];
  if (endDate.diff(startDate, 'years') > 0) return [];
  return [startDate, endDate];
};

const toStartOfDay = (date) => moment(date).startOf('day');
const toEndOfDay = (date) => moment(date).endOf('day');

module.exports = {
  isWithin1Year,
  toStartOfDay,
  toEndOfDay,
};
