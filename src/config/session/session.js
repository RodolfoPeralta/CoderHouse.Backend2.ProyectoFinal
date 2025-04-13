const session = require("express-session");
const MongoStore = require('connect-mongo');
require("dotenv").config();


function configureSession(app, mongoPath) {
    app.use(session({
        store:MongoStore.create({
            mongoUrl: mongoPath,
            ttl: 180
        }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    }));
}

module.exports = configureSession;