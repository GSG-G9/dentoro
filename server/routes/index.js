const router = require('express').Router();
const appointmentsRouter = require('./appointments');
const patientsRouter = require('./patients');
const usersRouter = require('./users');

router.use(usersRouter);
router.use(patientsRouter);
router.use(appointmentsRouter);

module.exports = router;
