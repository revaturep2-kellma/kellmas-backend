const OIDCBearerStrategy = require('passport-azure-ad').BearerStrategy;
const config = require('../config');

const options = {
  identityMetadata: config.creds.identityMetadata,
  clientID: config.creds.clientID,
  validateIssuer: config.creds.validateIssuer,
  issuer: config.creds.issuer,
  passReqToCallback: config.creds.passReqToCallback,
  loggingLevel: config.creds.loggingLevel
};

const bearerStrategy = new OIDCBearerStrategy(options,
  ((token, done) => {
    if (!token.oid)
      done(new Error('oid is not found in token'));
    else {
      done(null, token);
    }
  })
);

module.exports = bearerStrategy;