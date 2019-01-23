const router = require('express').Router();
const authController = require('../controllers/authController');
const passport = require('passport')

// Setting up the passport middleware for each of the OAuth providers
const googleAuth = passport.authenticate('google', { scope: ['profile', 'https://www.googleapis.com/auth/plus.business.manage'] })
const facebookAuth = passport.authenticate('facebook', { scope: ['manage_pages'] })

// This custom middleware allows us to attach the socket id to the session.
// With the socket id attached we can send back the right user info to 
// the right socket
const addSocketIdtoSession = (req, res, next) => {
  req.session.socketId = req.query.socketId
  next()
}

// Routes that are triggered by the React client
router.get('/google', addSocketIdtoSession, googleAuth)
router.get('/facebook', addSocketIdtoSession, facebookAuth)

// Routes that are triggered by callbacks from OAuth providers once 
// the user has authenticated successfully
router.get('/google/callback', googleAuth, authController.google)
router.get('/facebook/callback', facebookAuth, authController.facebook)

// Middleware that requires the user to be logged in. If the user is not logged
// in, it will redirect the user to authorize the application and then return
// them to the original URL they requested.
function authRequired (req, res, next) {
  console.log('passport', req._passport);
  console.log('req session', req.session);
  console.log('user', req.user); 
  if (!req.user && req.method !== 'OPTIONS') {
    req.session.oauth2return = req.originalUrl;
    return res.redirect('/auth/google');
  }
  next();
}

// Middleware that exposes the user's profile as well as login/logout URLs to
// any templates. These are available as `profile`, `login`, and `logout`.
function addTemplateVariables (req, res, next) {
  res.locals.profile = req.user;
  res.locals.login = `/auth/google?return=${encodeURIComponent(req.originalUrl)}`;
  res.locals.logout = `/auth/logout?return=${encodeURIComponent(req.originalUrl)}`;
  next();
}

function extractProfile (profile) {
  let imageUrl = '';
  if (profile.photos && profile.photos.length) {
    imageUrl = profile.photos[0].value;
  }
  return {
    id: profile.id,
    displayName: profile.displayName,
    image: imageUrl
  };
}

module.exports = {
  extractProfile: extractProfile,
  router: router,
  required: authRequired,
  template: addTemplateVariables
};