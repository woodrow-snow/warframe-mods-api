const router = require('express').Router();
const equipControl = require('../controllers/equip');

// --- DEV NOTE: need to create getAll, getSingle, and post for equipment ---

/* ***********************************************
 * GET
 * *********************************************** */
router.get('/', equipControl.getAll);

router.get('/:id', equipControl.getSingle);

/* ***********************************************
 * POST
 * *********************************************** */
router.post('/', equipControl.createEquip);

module.exports = router;
