require('dotenv').config();
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;
const User = require('../models/user-model');

console.log(process.env.CLIENT_ID);
const oidcStrategy = new OIDCStrategy({
  identityMetadata: process.env.IDENTITY_METADATA,
  clientID: process.env.CLIENT_ID,
  responseType: 'id_token',
  responseMode: 'form_post',
  redirectUrl: process.env.REDIRECT_URL,
  allowHttpForRedirectUrl: true,
  validateIssuer: false,
  clientSecret: process.env.CLIENT_SECRET
}, (iss, sub, profile, accessToken, refreshToken, done) => {
  // if (!profile.oid) {
  //   return done(new Error("No oid found"), null);
  // }

  // User.findOne({ where: { oid: profile.oid } })
  //   .then(user => {
  //     if (user) {
  //       return done(null, user);
  //     }
  //     console.log('hello');
  //     // "Auto-registration"
  //     User.create({ oid: profile.oid })
  //       .then(newUser => done(null, newUser))
  //       .catch(err => done(err));
  //   })
  //   .catch(err => done(err));
});

module.exports = oidcStrategy;