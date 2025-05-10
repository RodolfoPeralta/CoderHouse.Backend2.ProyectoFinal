const express = require('express');
const router = express.Router();

router.get("/", (request, response) => {
    if(!request.session.passport || !request.session.passport.user) {
        return response.redirect("/login");
    }

    const { first_name, last_name } = request.user;

    response.render("index", {
        first_name,
        last_name
    });
});

router.get("/login", (request, response) => {
    response.render("login", {layout: false});
});

router.get("/register", (request, response) => {
    response.render("register", {layout: false});
});

router.get("/forgot", (request, response) => {
    response.render("forgotPassword", {layout: false});
});

router.get("/reset", (request, response) => {
    const token = request.query.token;
    response.render("resetPassword", {
        layout: false, 
        token});
})

module.exports = router;