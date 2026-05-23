const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('You are live daddy-O! Request away!');
});

module.exports = router;