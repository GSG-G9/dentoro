const router = require('express').Router();
const {
  getPatients,
  getAllProfileData,
  getPatientByNameOrPhone,
  addHistoryLog,
} = require('../../controllers');

router.get('/', getPatients);
router.get('/search', getPatientByNameOrPhone);
router.route('/:patientId').get(getAllProfileData).patch();
router.post('/:patientId/history', addHistoryLog);
router.post('/:patientId/history');
router.patch('/:patientId/appointment/:appointmentId');

module.exports = router;
