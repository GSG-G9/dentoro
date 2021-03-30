const router = require('express').Router();
const {
  getAllProfileData,
  getPatientByNameOrPhone,
} = require('../../controllers');

router.get('/');
router.get('/search', getPatientByNameOrPhone);
router.route('/:patientId').get(getAllProfileData).patch();
router.post('/:patientId/history');
router.delete('/:patientId/appointment');
router.patch('/:patientId/appointment/:appointmentId');

module.exports = router;
