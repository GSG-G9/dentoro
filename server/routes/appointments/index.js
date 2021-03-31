const router = require('express').Router();
const {
  appointmentsSearch,
  getAppointmentsByDate,
  getAvailableAppointments,
  addAppointment,
  deleteAppointments,
} = require('../../controllers');

router.get('/search', appointmentsSearch);
router.get('/:appointmentDate', getAppointmentsByDate);
router.get('/available/:date', getAvailableAppointments);
router.post('/', addAppointment);
router.delete('/:appointmentId', deleteAppointments);

module.exports = router;
