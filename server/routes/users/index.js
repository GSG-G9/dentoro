const router = require('express').Router();
const { addUser, login, logout } = require('../../controllers');
const { isAuth } = require('../../middlewares');

router.post('/login', login);
router.use(isAuth);
router.post('/signup', addUser);
router.get('/logout', logout);

module.exports = router;
