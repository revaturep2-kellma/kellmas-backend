const express = require('express');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const config = require('./config');
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;

const User = require('./models/user-model');

passport.serializeUser((user, done) => {
  done(null, user.oid);
});

passport.deserializeUser((oid, done) => {
  User.findOne({ where: { oid } })
    .then(user => done(null, user))
    .catch(err => done(err));
});

passport.use(new OIDCStrategy({
  identityMetadata: config.creds.identityMetadata,
  clientID: config.creds.clientID,
  responseType: config.creds.responseType,
  responseMode: config.creds.responseMode,
  redirectUrl: config.creds.redirectUrl,
  allowHttpForRedirectUrl: config.creds.allowHttpForRedirectUrl,
  clientSecret: config.creds.clientSecret,
  validateIssuer: config.creds.validateIssuer,
  isB2C: config.creds.isB2C,
  issuer: config.creds.issuer,
  passReqToCallback: config.creds.passReqToCallback,
  scope: config.creds.scope,
  loggingLevel: config.creds.loggingLevel,
  nonceLifetime: config.creds.nonceLifetime,
  nonceMaxAmount: config.creds.nonceMaxAmount,
  useCookieInsteadOfSession: config.creds.useCookieInsteadOfSession,
  cookieEncryptionKeys: config.creds.cookieEncryptionKeys,
  clockSkew: config.creds.clockSkew,
},
((iss, sub, profile, accessToken, refreshToken, done) => {
  if (!profile.oid) {
    return done(new Error('No oid found'), null);
  }

  // Search DB for user. Create user if it does not exist.
  User.findOne({ where: { oid: profile.oid } })
    .then(user => {
      if (user) {
        return done(null, user);
      }
      User.create({ oid: profile.oid })
        .then(newUser => done(null, newUser))
        .catch(err => done(err));
    })
    .catch(err => done(err));
})
));

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

// 'GET returnURL'
// `passport.authenticate` will try to authenticate the content returned in
// query (such as authorization code). If authentication fails, user will be
// redirected to '/' (home page); otherwise, it passes to the next middleware.
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

// 'POST returnURL'
// `passport.authenticate` will try to authenticate the content returned in
// body (such as authorization code). If authentication fails, user will be
// redirected to '/' (home page); otherwise, it passes to the next middleware.
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
    res.redirect('/');
  });

// 'logout' route, logout from passport, and destroy the session with AAD.
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    req.logOut();
    res.redirect(config.destroySessionUrl);
  });
});

app.listen(3001);

