const router = require('express').Router();
const {
  getPatients,
  getAllProfileData,
  getPatientByNameOrPhone,
  patchPatientData,
  addHistoryLog,
} = require('../../controllers');

router.get('/', getPatients);
router.get('/search', getPatientByNameOrPhone);
router.route('/:patientId').get(getAllProfileData).patch(patchPatientData);
router.post('/:patientId/history', addHistoryLog);
router.patch('/:patientId/appointment/:appointmentId');

module.exports = router;
