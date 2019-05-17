const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;
const { User } = require('../models/models');
const config = require('../config');

const options = {
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
};

const oidcStrategy = new OIDCStrategy(options, ((iss, sub, profile, accessToken, refreshToken, done) => {
  if (!profile.oid) {
    return done(new Error('No oid found'), null);
  }

  // Search DB for user. Create user if it does not exist.
  User.findOne({ where: { oid: profile.oid } })
    .then(user => {
      if (user) {
        return done(null, user);
      }

      const newUser = {
        oid: profile.oid,
        username: profile.displayName
      };

      User.create(newUser)
        .then(newUser => done(null, newUser))
        .catch(err => done(err));
    })
    .catch(err => done(err));
}));

module.exports = oidcStrategy;