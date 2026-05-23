const router = require('express').Router();
const equipControl = require('../controllers/equip');
const { equipValidationRules, validate } = require('../validation/validator');

// --- DEV NOTE: need to create getAll, getSingle, and post for equipment ---

/* ***********************************************
 * GET
 * *********************************************** */
router.get('/', equipControl.getAll);

router.get('/:id', equipControl.getSingle);

/* ***********************************************
 * POST
 * *********************************************** */
router.post('/', equipValidationRules(), validate, equipControl.createEquip);

/* ***********************************************
 * PUT
 * *********************************************** */
router.put('/:id', equipValidationRules(), validate, equipControl.updateEquip);

/* ***********************************************
 * DELETE
 * *********************************************** */
router.delete('/:id', equipControl.deleteEquip);

module.exports = router;
