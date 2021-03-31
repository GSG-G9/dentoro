const router = require('express').Router();
const {
  appointmentsSearch,
  getAppointmentsByDate,
  getAvailableAppointments,
  deleteAppointments,
} = require('../../controllers');

router.get('/search', appointmentsSearch);
router.get('/:appointmentDate', getAppointmentsByDate);
router.get('/available/:date', getAvailableAppointments);
router.delete('/:appointmentId', deleteAppointments);
router.post('/');

module.exports = router;
