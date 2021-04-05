const router = require('express').Router();
require('../../controllers');
const { addUser, login, logout } = require('../../controllers');

router.post('/signup', addUser);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;
