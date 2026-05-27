const passport = require('passport');

const router = require('express').Router();

router.get('/', (req, res) => {
     res.send(
          req.session.user !== undefined
               ? `Hey there cool cat! You are logged in as ${req.session.user.displayName}`
               : "Woah Daddy-O! You aren't logged in!"
     );
});

router.use('/mods', require('./mods'));

router.use('/equip', require('./equip'));

// login in and logout routes
router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function (req, res, next) {
     req.logout(function (err) {
          if (err) {
               return next(err);
          }
          res.redirect('/');
     });
});

module.exports = router;
