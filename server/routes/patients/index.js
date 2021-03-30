const router = require('express').Router();
const {
  getPatients,
  getAllProfileData,
  getPatientByNameOrPhone,
  deleteAppointments,
} = require('../../controllers');

router.get('/', getPatients);
router.get('/search', getPatientByNameOrPhone);
router.route('/:patientId').get(getAllProfileData).patch();
router.post('/:patientId/history');
router.delete('/:patientId/appointment');
router.delete('/:patientId/appointment/:appointmentId', deleteAppointments);

module.exports = router;
