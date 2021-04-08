const router = require('express').Router();
const { addUser, login, logout, authorizedUser } = require('../../controllers');
const { isAuth } = require('../../middlewares');

router.post('/login', login);
router.use(isAuth);
router.get('/is-auth', authorizedUser);
router.post('/signup', addUser);
router.get('/logout', logout);

module.exports = router;
