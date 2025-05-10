const express = require("express");
const router = express.Router();
const PasswordController = require("../../controllers/PasswordController");

router.post("/forgot", async (request, response) => await PasswordController.forgotPassword(request, response));
router.post("/reset", async (request, response) => await PasswordController.resetPassword(request, response));

module.exports = router;