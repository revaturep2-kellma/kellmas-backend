require('dotenv').config();
const express = require('express');
const passport = require('passport');
const config = require('../config');

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;
const router = express.Router();

router.get('/login',
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
    res.redirect('/');
  });

router.get('/return',
  (req, res, next) => {
    passport.authenticate('azuread-openidconnect',
      {
        response: res,                      // required
        failureRedirect: '/'
      }
    )(req, res, next);
  },
  (req, res) => {
    res.redirect(`${CLIENT_ORIGIN}/?token=${req.body.id_token}`);
  });

router.post('/return',
  (req, res, next) => {
    passport.authenticate('azuread-openidconnect',
      {
        response: res,                      // required
        failureRedirect: '/'
      }
    )(req, res, next);
  },
  (req, res) => {
    res.redirect(`${CLIENT_ORIGIN}/?token=${req.body.id_token}`);
  });

router.get('/logout', (req, res) => {
  res.redirect(`https://login.microsoftonline.com/${process.env.AZ_DOMAIN}/oauth2/logout?post_logout_redirect_uri=${CLIENT_ORIGIN}`);
});


module.exports = router;