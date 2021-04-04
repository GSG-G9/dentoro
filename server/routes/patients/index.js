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

module.exports = router;
