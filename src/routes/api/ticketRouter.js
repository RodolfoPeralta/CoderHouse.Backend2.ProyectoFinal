const express = require("express");
const router = express.Router();
const TicketManagerController = require("../../controllers/ticketManagerController");
const Middlewares = require("../../Middlewares/Middlewares");
const PassportService = require("../../services/PassportService");

router.get("/", Middlewares.authorization("admin"), async (request, response) => await TicketManagerController.getTickets(request, response));
router.get("/:tid", Middlewares.authorization("admin"), async (request, response) => await TicketManagerController.getTicketById(request, response));
router.post("/", Middlewares.authorization("admin"), async (request, response) => await TicketManagerController.createTicket(request, response));
router.put("/:tid", Middlewares.authorization("admin"), async (request, response) => await TicketManagerController.updateTicketById(request, response));
router.delete("/:tid", Middlewares.authorization("admin"), async (request, response) => await TicketManagerController.deleteTicketById(request, response));
router.post("/purchase", 
            PassportService.PassportCallBack("jwt", {session: false}),
            async (request, response) => await TicketManagerController.generateTicket(request, response));

module.exports = router;