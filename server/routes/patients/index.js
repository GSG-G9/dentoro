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
router.delete('/:patientId/appointments/:appointmentId', deleteAppointments);
router.post('/:patientId/history');
router.delete('/:patientId/appointment');

module.exports = router;
