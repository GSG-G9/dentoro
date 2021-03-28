const router = require('express').Router();
require('../../controllers');

router.post('/login');
router.get('/logout');
router.post('/signup');

module.exports = router;
