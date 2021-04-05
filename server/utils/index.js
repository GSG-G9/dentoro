const validations = require('./validation');
const boomify = require('./boomify');
const checkAvailableTimes = require('./availableTimes');
const jwt = require('./jwt');

module.exports = { ...validations, boomify, checkAvailableTimes, ...jwt };
