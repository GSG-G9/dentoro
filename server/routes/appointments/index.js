const router = require('express').Router();
const { appointmentsSearch } = require('../../controllers');
const { getAppointmentsByDate } = require('../../controllers');

router.get('/search', appointmentsSearch);
router.get('/:appointmentDate', getAppointmentsByDate);
router.get('/available/:date');
router.post('/');

module.exports = router;
