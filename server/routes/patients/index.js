const router = require('express').Router();
const {
  getPatients,
  getPatientById,
  editPatientProfile,
  searchPatient,
  addPatientHistory,
  editPatientAppointment,
  deletePatientAppointment,
} = require('../../controllers');

router.get('/patients', getPatients);
router
  .route('/patients/:patientId')
  .get(getPatientById)
  .patch(editPatientProfile);
router.get('/patients/search', searchPatient);
router.post('/patients/:patientId/history', addPatientHistory);
router.patch(
  '/patients/:patientId/appointment/:appointmentId',
  editPatientAppointment,
);
router.delete('/patients/:patientId/appointment', deletePatientAppointment);

module.exports = router;
