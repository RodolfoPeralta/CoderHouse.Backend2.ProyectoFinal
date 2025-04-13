const express = require("express");
const router = express.Router();
const AuthManagerController = require("../../controllers/authManagerController");
const PassportService = require("../../services/PassportService");

router.post("/register", PassportService.PassportCallBack("register", {session: false}), 
            (request, response) => AuthManagerController.register(request, response));
router.post("/login", PassportService.PassportCallBack("login", {session: false}),
            (request, response) => AuthManagerController.login(request, response));
router.get("/current", PassportService.PassportCallBack("jwt"), 
            (request, response) => AuthManagerController.getCurrentUser(request, response));
router.post("/logout", async (request, response) => AuthManagerController.logout(request, response));

module.exports = router;