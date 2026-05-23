const router = require('express').Router();

router.get('/', (req, res) => {
     res.send('You are live daddy-O! Request away!');
});

router.use('/mods', require('./mods'));

router.use('/equip', require('./equip'));

module.exports = router;
