const router = require('express').Router();
const {
  getAllProfileData,
  getPatientByNameOrPhone,
  addHistoryLog,
} = require('../../controllers');

router.get('/');
router.get('/search', getPatientByNameOrPhone);
router.route('/:patientId').get(getAllProfileData).patch();
router.post('/:appointmentId/history', addHistoryLog);
router.delete('/:patientId/appointment');
router.patch('/:patientId/appointment/:appointmentId');

module.exports = router;
