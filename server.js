/* ***********************************************
 * required Statements
 * *********************************************** */
const express = require('express');
const mongo = require('./database/database');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger_output.json');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
require('dotenv').config();

// creating applicaiton
const app = express();

/* ***********************************************
 * Middleware
 * *********************************************** */
app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(
     session({
          secret: process.env.SESSION_SECRET,
          resave: false,
          saveUninitialized: true
     })
);
// basic express session initialization
app.use(passport.initialize());
// init passport on every route call
app.use(passport.session());
// allow passport to use "express-session"
app.use((req, res, next) => {
     res.setHeader('Access-Controll-Allow-Origin', '*');
     res.setHeader(
          'Access-Controll-Allow-Headers',
          'Origin, X-Requested-With, Content-Type, Accept, Z-key, Authorization'
     );
     res.setHeader('Access-Controll-Allow-Methods', 'POST, GET, PUT, PATCH, OPTIONS, DELETE');
     next();
});

passport.use(
     new GitHubStrategy(
          {
               clientID:
                    process.env.ENV_TYPE === 'dev'
                         ? process.env.GITHUB_CLIENT_ID_DEV
                         : process.env.GITHUB_CLIENT_ID,
               clientSecret:
                    process.env.ENV_TYPE === 'dev'
                         ? process.env.GITHUB_CLIENT_SECRET_DEV
                         : process.env.GITHUB_CLIENT_SECRET,
               callbackURL:
                    process.env.ENV_TYPE === 'dev'
                         ? process.env.CALLBACK_URL_DEV
                         : process.env.CALLBACK_URL
          },
          function (accessToken, refreshToken, profile, done) {
               // to add to github profile to our db
               // User.findOrCreate({githubId: profile.id}, function (err, user) {
               return done(null, profile);
               //});
          }
     )
);

passport.serializeUser((user, done) => {
     done(null, user);
});
passport.deserializeUser((user, done) => {
     done(null, user);
});

/* ***********************************************
 * Routes
 * *********************************************** */
app.use('/', require('./routes'));

app.get(
     '/github/callback',
     passport.authenticate('github', {
          failureRedirect: '/api-docs',
          session: false
     }),
     (req, res) => {
          req.session.user = req.user;
          res.redirect('/');
     }
);

/* ***********************************************
 * Starting server
 * *********************************************** */
const port = process.env.PORT || 3000;

mongo.initDB((err) => {
     if (err) {
          console.log(err);
     } else {
          app.listen(port, () => {
               console.log('Connected to DB and API started on: ' + port);
          });
     }
});
