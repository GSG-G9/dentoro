const router = require('express').Router();
require('../../controllers');
const { addUser, logout } = require('../../controllers');

router.post('/login');
router.get('/logout', logout);
router.post('/signup', addUser);

module.exports = router;
