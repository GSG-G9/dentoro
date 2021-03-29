const router = require('express').Router();
const { getPatientByNameOrPhone } = require('../../controllers');

router.get('/');
router.get('/search', getPatientByNameOrPhone);
router.route('/:patientId').get().patch();
router.post('/:patientId/history');
router.delete('/:patientId/appointment');
router.patch('/:patientId/appointment/:appointmentId');

module.exports = router;
