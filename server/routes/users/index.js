const router = require('express').Router();
const { login, logout, signup } = require('../../controllers');

router.post('/users/login', login);
router.get('/users/logout', logout);
router.post('/users/signup', signup);

module.exports = router;
