const express = require('express');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const config = require('./config');
const oidcStrategy = require('./passport/oidc-strategy');

const User = require('./models/user-model');

// Setup passport
passport.serializeUser((user, done) => {
  done(null, user.oid);
});

passport.deserializeUser((oid, done) => {
  console.log('oid: ', oid);
  User.findOne({ where: { oid } })
    .then(user => done(null, user))
    .catch(err => done(err));
});

passport.use(oidcStrategy);

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(methodOverride());
app.use(cookieParser());

// set up session middleware
app.use(expressSession({ secret: 'keyboard cat', resave: true, saveUninitialized: false }));

app.use(bodyParser.urlencoded({ extended : true }));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/../../public'));

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

app.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

// '/account' is only available to logged in user
app.get('/account', ensureAuthenticated, (req, res) => {
  res.render('account', { user: req.user });
});

app.get('/login',
  (req, res, next) => {
    passport.authenticate('azuread-openidconnect',
      {
        response: res,                      // required
        resourceURL: config.resourceURL,    // optional. Provide a value if you want to specify the resource.
        customState: 'my_state',            // optional. Provide a value if you want to provide custom state value.
        failureRedirect: '/'
      }
    )(req, res, next);
  },
  (req, res) => {
    console.info('Login was called in the Sample');
    res.redirect('/');
  });

app.get('/auth/openid/return',
  (req, res, next) => {
    passport.authenticate('azuread-openidconnect',
      {
        response: res,                      // required
        failureRedirect: '/'
      }
    )(req, res, next);
  },
  (req, res) => {
    console.info('We received a return from AzureAD.');
    res.redirect('/');
  });

app.post('/auth/openid/return',
  (req, res, next) => {
    passport.authenticate('azuread-openidconnect',
      {
        response: res,                      // required
        failureRedirect: '/'
      }
    )(req, res, next);
  },
  (req, res) => {
    console.info('We received a return from AzureAD.');
    res.redirect(`/?token=${req.body.id_token}`);
  });

// 'logout' route, logout from passport, and destroy the session with AAD.
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    req.logOut();
    res.redirect(config.destroySessionUrl);
  });
});

app.listen(3001);

