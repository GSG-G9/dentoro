const router = require('express').Router();
const appointmentsRouter = require('./appointments');
const patientsRouter = require('./patients');
const usersRouter = require('./users');
const { isAuth } = require('../middlewares');

router.use('/appointments', appointmentsRouter);
router.use('/', usersRouter);
router.use(isAuth);
router.use('/patients', patientsRouter);

module.exports = router;
