const router = require('express').Router();
const { getAllProfileData } = require('../../controllers');

router.get('/');
router.get('/search');
router.route('/:patientId').get(getAllProfileData).patch();
router.post('/:patientId/history');
router.delete('/:patientId/appointment');
router.patch('/:patientId/appointment/:appointmentId');

module.exports = router;
