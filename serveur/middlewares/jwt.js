const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// A protected route that requires a valid JWT token to access
exports.protectedRoute = passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.status(200).json({ message: 'You have access to the protected route' });
  };
  