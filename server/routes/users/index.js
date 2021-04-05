const router = require('express').Router();
const { addUser, login, logout } = require('../../controllers');
const { isAuth } = require('../../middlewares');

router.post('/signup', addUser);
router.post('/login', login);
router.get('/logout', isAuth, logout);

module.exports = router;
