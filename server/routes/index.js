const router = require('express').Router();
const appointmentsRouter = require('./appointments');
const patientsRouter = require('./patients');
const usersRouter = require('./users');

router.use('/users', usersRouter);
router.use('/patients', patientsRouter);
router.use('/appointments', appointmentsRouter);

module.exports = router;
