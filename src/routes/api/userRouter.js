const express = require('express');
const router = express.Router();
const UserManagerController = require('../../controllers/UserManagerController');
const Middlewares = require('../../Middlewares/Middlewares');

router.get("/", async (request, response) => await UserManagerController.getUsers(request, response));
router.get("/:uid", async (request, response) => await UserManagerController.getUserById(request, response));
router.post("/", Middlewares.authorization("admin"), async (request, response) => await UserManagerController.addUser(request, response));
router.put("/:uid", Middlewares.authorization("admin"), async (request, response) => await UserManagerController.updateUser(request, response));
router.delete("/:uid", Middlewares.authorization("admin"), async (request, response) => await UserManagerController.deleteUserById(request, response));
router.delete("/", Middlewares.authorization("admin"), async (request, response) => await UserManagerController.deleteAllUsers(request, response));

module.exports = router;