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
const authRouter = require('./routers/auth-router');
const userRouter = require('./routers/user-router');
const newUserRouter = require('./routers/addUser-router');
const newSQLRouter = require('./routers/SQL-router');
const newBlobRouter = require('./routers/blob-router');
const newVMRouter = require('./routers/vm-router');
const newNetworkRouter = require('./routers/vnet-router');
// const newASPRouter = require('./routers/appService-router');
const newWebAppRouter = require('./routers/webApp-router');
const resourceRouter = require('./routers/resource-router');
const roleRouter = require('./routers/role-router');
const updateUserRouter = require('./routers/update-user-router');

const app = express();

// Setup passport
passport.serializeUser((oid, done) => {
  done(null, oid);
});

passport.deserializeUser((oid, done) => {
  done(null, oid);
});

passport.use(oidcStrategy);
passport.use(bearerStrategy);

app.use(morgan('dev'));
app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(cookieParser());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(passport.initialize());

const bearerOption = passport.authenticate('oauth-bearer', {
  session: false
});

// Mount routers
app.use('/auth/openid', authRouter);
app.use('/adminUsers', userRouter);
app.use('/newUsers', bearerOption, newUserRouter);
app.use('/newSQL', bearerOption, newSQLRouter);
app.use('/newBlob', bearerOption, newBlobRouter);
app.use('/newNetwork', bearerOption, newNetworkRouter);
app.use('/newVM', bearerOption, newVMRouter);
// app.use('/newASP', bearerOption, newASPRouter);
app.use('/newWebApp', bearerOption, newWebAppRouter);
app.use('/resources', bearerOption, resourceRouter);
app.use('/roles', bearerOption, roleRouter);
app.use('/updateUser', bearerOption, updateUserRouter);

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Sample endpoint for authentication
app.get('/main', bearerOption, (req, res) => {
  res.json('working');
});

app.listen(PORT);

