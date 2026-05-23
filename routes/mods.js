const router = require('express').Router();
const modsControl = require('../controllers/mods');

/* ***********************************************
 * GET
 * *********************************************** */
router.get('/', modsControl.getAll);

router.get('/:id', modsControl.getSingle);

module.exports = router;