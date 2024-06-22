const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// Définissez votre stratégie de JWT
const jwtOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: "SECRET_KEY"
};

const User = require('../modele/User');
passport.use(new JWTStrategy(jwtOptions, function (jwtPayload, done) {
    // Recherchez l'utilisateur dans la base de données à l'aide de l'ID stocké dans le jeton
    User.findById(jwtPayload.id)
        .then(user => {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch(err => {
            return done(err, false);
        });
}));



