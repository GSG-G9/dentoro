const router = require('express').Router();
const { logout } = require('../../controllers');

router.post('/login');
router.get('/logout', logout);
router.post('/signup');

module.exports = router;
