const patientsControllers = require('./patients');
const appointmentControllers = require('./appointments');
const usersControllers = require('./users');

module.exports = {
  ...patientsControllers,
  ...appointmentControllers,
  ...usersControllers,
};
