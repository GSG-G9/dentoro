const router = require('express').Router();
require('../../controllers');

router.post('/users/login');
router.get('/users/logout');
router.post('/users/signup');

module.exports = router;
