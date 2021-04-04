const router = require('express').Router();
require('../../controllers');
const { isAuth } = require('../../middlewares');

router.post('/login');
router.post('/signup');

router.get('/logout', isAuth);

module.exports = router;
