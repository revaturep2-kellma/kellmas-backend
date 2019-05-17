require('dotenv').config();

const key1 = process.env.KEY1 || '12345678901234567890123456789012';
const key2 = process.env.KEY2 || 'abcdefghijklmnopqrstuvwxyzabcdef';
const iv1 = process.env.IV1 || '123456789012';
const iv2 = process.env.IV2 || 'abcdefghijkl';

exports.creds = {
  identityMetadata: process.env.IDENTITY_METADATA,
  clientID: process.env.CLIENT_ID,
  responseType: 'code id_token',
  responseMode: 'form_post',
  redirectUrl: process.env.REDIRECT_URL,
  allowHttpForRedirectUrl: true,
  clientSecret: process.env.CLIENT_SECRET,
  validateIssuer: false,
  issuer: null,
  passReqToCallback: false,
  useCookieInsteadOfSession: true,
  cookieEncryptionKeys: [
    { 'key': key1, 'iv': iv1 },
    { 'key': key2, 'iv': iv2 }
  ],
  scope: ['profile', 'offline_access', 'https://graph.microsoft.com/mail.read'],
  loggingLevel: 'info',
  nonceLifetime: null,
  nonceMaxAmount: 5,
  clockSkew: null,
};

exports.destroySessionUrl = `https://login.microsoftonline.com/common/oauth2/logout?post_logout_redirect_uri=${process.env.CLIENT_ORIGIN}`;
