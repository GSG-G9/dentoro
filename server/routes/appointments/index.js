const router = require('express').Router();
const {
  searchAppointments,
  getAppointmentsAtSpecificDate,
  getAvailableAppointmentsAtSpecificDate,
  addAppointment,
} = require('../../controllers');

router.get('/appointments/search', searchAppointments);
router.get('/appointments/:date', getAppointmentsAtSpecificDate);
router.get(
  '/appointments/available/:date',
  getAvailableAppointmentsAtSpecificDate,
);
router.post('/appointments', addAppointment);

module.exports = router;
