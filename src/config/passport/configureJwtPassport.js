const passport = require('passport');
const jwt = require('passport-jwt');
const UserManager = require('../../managers/UserManager');
require("dotenv").config();

const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const strategyConfiguration = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

async function verifyToken(jwt_payload, done) {
    try {
        if(!jwt_payload || !jwt_payload._id) {
            return done(null, false, "Invalid Token");
        }

        const user = await UserManager.getUserById(jwt_payload._id);

        if (!user) {
            return done(null, false, "User not found");
        }
    
        return done(null, user);
    }
    catch(error) {
        return done(error, null, "Error Verifying access token");
    }
}

const jwtStrategy = new JwtStrategy(strategyConfiguration, verifyToken);

function configureJwtPassport() {

    passport.use("jwt", jwtStrategy);

    passport.serializeUser((user, done) => {
        try {
            done(null, user._id);
        }
        catch(error) {
            done(error);
        }
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await UserManager.getUserById(id);
            done(null, user);
        }
        catch(error) {
            done(error);
        }
    });
}

module.exports = configureJwtPassport;

