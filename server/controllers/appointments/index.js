const appointmentsSearch = require('./appointmentsSearch');

module.exports = { appointmentsSearch };
module.exports.addAppointment = require('./addAppointment');
module.exports.getAppointmentsByDate = require('./getAppointmentsByDate');
module.exports.getAvailableAppointments = require('./getAvailableAppointments');
