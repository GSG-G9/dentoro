const appointmentsSearch = require('./appointmentsSearch');

module.exports = { appointmentsSearch };
module.exports.addAppointment = require('./addAppointment');
module.exports.appointmentsSearch = require('./appointmentsSearch');
module.exports.getAppointmentsByDate = require('./getAppointmentsByDate');
module.exports.getAvailableAppointments = require('./getAvailableAppointments');
module.exports.deleteAppointments = require('./deleteAppointments');
module.exports.editAppointmentTime = require('./editAppointmentTime');
module.exports.editAppointmentStatus = require('./editAppointmentStatus');
