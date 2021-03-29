const router = require('express').Router();
const { appointmentsSearch } = require('../../controllers');

router.get('/search', appointmentsSearch);
router.get('/:date');
router.get('/available/:date');
router.post('/');

module.exports = router;
