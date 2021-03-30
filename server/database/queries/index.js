const { getAppointmentsByPatientName } = require('./appointments');

module.exports = { getAppointmentsByPatientName };
module.exports.getPatientByNameOrPhoneQuery = require('./getPatientByNameOrPhoneQuery');
module.exports.getAppointmentsByDateQuery = require('./getAppointmentsByDateQuery');
