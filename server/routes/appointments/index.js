const router = require('express').Router();
const { getAppointmentsByDate } = require('../../controllers');

router.get('/search');
router.get('/:appointmentDate', getAppointmentsByDate);
router.get('/available/:date');
router.post('/');

module.exports = router;
