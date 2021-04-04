const router = require('express').Router();
require('../../controllers');
const { addUser, login } = require('../../controllers');

router.post('/login', login);
router.get('/logout');
router.post('/signup', addUser);

module.exports = router;
