const router = require('express').Router();
const { addUser } = require('../../controllers');
const { isAuth } = require('../../middlewares');

router.post('/login');
router.post('/signup', addUser);
router.get('/logout', isAuth);

module.exports = router;
