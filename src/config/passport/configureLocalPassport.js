const CartManager = require('../../managers/CartManager');
const UserManager = require('../../managers/UserManager');
const BcryptUtils = require('../../Utils/BcryptUtils');
const LocalStrategy = require("passport-local").Strategy;
const passport = require('passport');

const strategyConfiguration = {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
};

async function register(request, email, password, done) {
    try {
        const { first_name, last_name, email, age, password } = request.body;

        const user = await UserManager.getUserByEmail(email);

        if(user) {
            return done(null, false, "User already exists");
        }

        const cart = await CartManager.createCart();

        const newUser = {
            first_name,
            last_name,
            email,
            age,
            cart,
            password: BcryptUtils.createHash(password)
        }

        const result = await UserManager.addUser(newUser);

        return done(null, result);
    }
    catch(error) {
        return done(error, false, "Error registering a new user");
    }
}

async function login(request, email, password, done) {
    try {
        const user = await UserManager.getUserByEmail(email);

        if(!user) {
            return done(null, false, `User with email '${email}' not found`);
        }

        const validPassword = BcryptUtils.validatePassword(password, user.password);

        if(!validPassword) {
            return done(null, false, "Wrong Password");
        }

        return done(null, user);
    }
    catch(error) {
        return done(error, false, "Error logging user");
    }
}

const registerStrategy = new LocalStrategy(strategyConfiguration, register);
const loginStrategy = new LocalStrategy(strategyConfiguration, login);

function configureLocalPassport() {
    passport.use("register", registerStrategy);
    passport.use("login", loginStrategy);

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

module.exports = configureLocalPassport;