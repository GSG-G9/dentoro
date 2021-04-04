const router = require('express').Router();
const {
  appointmentsSearch,
  getAppointmentsByDate,
  getAvailableAppointments,
  addAppointment,
  deleteAppointments,
  editAppointmentTime,
  editAppointmentStatus,
} = require('../../controllers');

router.get('/search', appointmentsSearch);
router.get('/:appointmentDate', getAppointmentsByDate);
router.get('/available/:date', getAvailableAppointments);
router.post('/', addAppointment);
router.delete('/:appointmentId', deleteAppointments);
router.patch('/:appointmentId/time', editAppointmentTime);
router.patch('/:appointmentId/status', editAppointmentStatus);

module.exports = router;
