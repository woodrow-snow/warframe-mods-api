const router = require('express').Router();
const modsControl = require('../controllers/mods');

router.use('/', modsControl.getAll);

module.exports = router;