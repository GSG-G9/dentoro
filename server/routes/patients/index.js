const router = require('express').Router();
const { getPatients } = require('../../controllers');

router.get('/', getPatients);
router.get('/search');
router.route('/:patientId').get().patch();
router.post('/:patientId/history');
router.delete('/:patientId/appointment');
router.patch('/:patientId/appointment/:appointmentId');

module.exports = router;
