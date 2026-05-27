const router = require('express').Router();
const modsControl = require('../controllers/mods');
const {
     addModValidationRules,
     validate,
     putModValidationRules
} = require('../middleware/validator');
const { isAuthenticated } = require('../middleware/authenicate');

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
     isAuthenticated,
     addModValidationRules(),
     validate,
     modsControl.createMod
);

/* ***********************************************
 * PUT
 * *********************************************** */
router.put(
     '/:id',
     // #swagger.description = 'Updates a mod in the database. Please remove lines that you don't want to update.'
     isAuthenticated,
     putModValidationRules(),
     validate,
     modsControl.updateMod
);

/* ***********************************************
 * DELETE
 * *********************************************** */
router.delete('/:id', isAuthenticated, modsControl.deleteMod);

module.exports = router;
