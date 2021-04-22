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
const { isAuth } = require('../../middlewares');

router.post('/', addAppointment);
router.get('/available/:date', getAvailableAppointments);

router.use(isAuth);
router.get('/search', appointmentsSearch);
router.get('/:appointmentDate', getAppointmentsByDate);

router.delete('/:appointmentId', deleteAppointments);
router.patch('/:appointmentId/time', editAppointmentTime);
router.patch('/:appointmentId/status', editAppointmentStatus);

module.exports = router;
