const router = require('express').Router();
const modsControl = require('../controllers/mods');

/* ***********************************************
 * GET
 * *********************************************** */
router.get('/', modsControl.getAll);

router.get('/:id', modsControl.getSingle);

/* ***********************************************
 * POST
 * *********************************************** */
router.post(
    '/',
    // #swagger.description = 'Creates a new mod to add to the database. If you have an equipment type, please use the name of the equipment instead of the id in the equip_id field. The server will handle that part.'
    modsControl.createMod);

module.exports = router;