const router = require('express').Router();
const {
  getPatients,
  getAllProfileData,
  getPatientByNameOrPhone,
} = require('../../controllers');

router.get('/', getPatients);
router.get('/search', getPatientByNameOrPhone);
router.route('/:patientId').get(getAllProfileData).patch();
router.post('/:patientId/history');

module.exports = router;
