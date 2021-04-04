const router = require('express').Router();
const appointmentsRouter = require('./appointments');
const patientsRouter = require('./patients');
const usersRouter = require('./users');
const { isAuth } = require('../middlewares');

router.use('/users', usersRouter);
router.use(isAuth);
router.use('/patients', patientsRouter);
router.use('/appointments', appointmentsRouter);

module.exports = router;
