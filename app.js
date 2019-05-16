require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;
const bearerStrategy = require('./passport/bearer-strategy');
const oidcStrategy = require('./passport/oidc-strategy');
const User = require('./models/user-model');
const authRouter = require('./routers/auth-router');

// Setup passport
passport.serializeUser((user, done) => {
  done(null, user.oid);
});

passport.deserializeUser((oid, done) => {
  User.findOne({ where: { oid } })
    .then(user => done(null, user))
    .catch(err => done(err));
});

passport.use(oidcStrategy);
passport.use(bearerStrategy);

const app = express();

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(methodOverride());
app.use(cookieParser());

// set up session middleware
app.use(bodyParser.urlencoded({ extended : true }));
app.use(passport.initialize());

// Mount routers
app.use('/auth/openid', authRouter);

// Sample endpoint for authentication
app.get('/main', passport.authenticate('oauth-bearer', {
  session: false
}), (req, res) => {
  res.json('working');
});

app.listen(3001);

