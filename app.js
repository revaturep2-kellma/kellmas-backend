require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const morgan = require('morgan');

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;
const PORT = process.env.PORT || 3001;
const bearerStrategy = require('./passport/bearer-strategy');
const oidcStrategy = require('./passport/oidc-strategy');
const User = require('./models/user-model');
const authRouter = require('./routers/auth-router');
const userRouter = require('./routers/user-router');

const app = express();

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

app.use(morgan('dev'));
app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(cookieParser());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(passport.initialize());

// Mount routers
app.use('/auth/openid', authRouter);
app.use('/users', userRouter);

// Sample endpoint for authentication
app.get('/main', passport.authenticate('oauth-bearer', {
  session: false
}), (req, res) => {
  res.json('working');
});

app.listen(PORT);

