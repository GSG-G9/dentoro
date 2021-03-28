const router = require('express').Router();
require('../../controllers');

router.get('/search');
router.get('/:date');
router.get('/available/:date');
router.post('/');

module.exports = router;
