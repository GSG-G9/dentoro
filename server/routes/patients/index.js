const router = require('express').Router();
require('../../controllers');

router.get('/patients');
router.route('/patients/:patientId').get().patch();
router.get('/patients/search');
router.post('/patients/:patientId/history');
router.patch('/patients/:patientId/appointment/:appointmentId');
router.delete('/patients/:patientId/appointment');

module.exports = router;
