const express = require('express');
const expressSession = require('express-session');
const morgan = require('morgan');
const passport = require('passport');

const db = require('./db');
const oidcStrategy = require('./passport/oidc-strategy');
const User = require('./models/user-model');

const PORT = 3001;
const app = express();

// Set up logger
app.use(morgan('dev'));

// Set up session
app.use(expressSession({ secret: 'keyboard cat', resave: true, saveUninitialized: false }));

// Set up passport
// passport.serializeUser(function(user, done) {
//   done(null, user.oid);
// });

// passport.deserializeUser(function(oid, done) {
//   User.findOne({ where: { oid } })
//     .then(user => done(null, user))
//     .catch(err => done(err));
// });

passport.use(oidcStrategy);
// app.use(passport.initialize());
// app.use(passport.session());

// Login
app.get('/login', (req, res, next) => {
  passport.authenticate('azuread-openidconnect', {
    response: res,
    failureRedirect: '/'
  })(req, res, next);
}, (req, res) => {
  console.log.info('Login was called in the Sample');
  res.redirect('/');
});

app.get('/', (req, res) =>{
  res.send('hello login');
}
);

// Start server
app.listen(PORT, () => {
  console.log(`Server up on PORT ${PORT}`);

  db.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));
});
