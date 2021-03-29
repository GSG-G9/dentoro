const router = require('express').Router();
const {
  getAppointmentsByDate,
  getAvailableAppointments,
} = require('../../controllers');

router.get('/search');
router.get('/:appointmentDate', getAppointmentsByDate);
router.get('/available/:date', getAvailableAppointments);
router.post('/');

module.exports = router;
