const express = require("express");
const passport = require("passport");

function configureMiddlewares(app) {
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    // Passport
    app.use(passport.initialize());
    app.use(passport.session());
}

module.exports = configureMiddlewares;