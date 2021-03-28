const router = require('express').Router();
require('../../controllers');

router.get('/appointments/search');
router.get('/appointments/:date');
router.get('/appointments/available/:date');
router.post('/appointments');

module.exports = router;
