const TicketManager = require("../managers/TicketManager");

class TicketManagerController {

    // Public Methods

    static async getTickets(request, response) {
        try {
            const tickets = await TicketManager.getTickets();

            return response.status(200).json({Status: "Success", Payload: tickets});
        }
        catch(error) {
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }

    static async getTicketById(request, response) {
        try {
            const tid = request.params.tid;

            if(!tid) {
                return response.status(400).json({Status: "Error", Message: "Ticket id is required"});
            }

            const ticket = await TicketManager.getTicketById(tid);

            if(!ticket){
                return response.status(404).json({Status: "Error", Message: `Ticket with id '${tid}' not found`});
            }

            return response.status(200).json({Status: "Success", Payload: ticket});
        }
        catch(error) {
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }

    static async createTicket(request, response) {
        try {
            const { full_name, email, cart } = request.body;

            if(!full_name || !email || !cart) {
                return response.status(400).json({status: "Error", Message: "All ticket parameters are required"});
            }

            const ticket = {
                full_name,
                email,
                cart
            };

            const newTicket = await TicketManager.createTicket(ticket);

            return response.status(201).json({Status: "Success", Payload: newTicket});
        }
        catch(error) {
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }

    static async updateTicketById(request, response) {
        try {
            const tid = request.params.tid;

            if(!tid) {
                return response.status(400).json({Status: "Error", Message: "Ticket id is required"});
            }

            const { full_name, email, cart } = request.body;

            if(!full_name || !email || !cart) {
                return response.status(400).json({status: "Error", Message: "All ticket parameters are required"});
            }

            const updatedTicket = {
                full_name,
                email,
                cart
            };

            if(await TicketManager.updateTicketById(tid, updatedTicket)) {
                return response.status(200).json({Status: "Success", Message: `Ticket with id '${tid}' updated`});
            }
            else {
                return response.status(404).json({Status: "Error", Message: `Ticket with id '${tid}' not founded`});
            }
        }
        catch(error) {
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }

    static async deleteTicketById(request, response) {
        try {
            const tid = request.params.tid;

            if(!tid) {
                return response.status(400).json({Status: "Error", Message: "Ticket id is required"});
            }

            if(await TicketManager.deleteTicketById(tid)) {
                response.status(200).json({Status: "Success", Message: "Ticket deleted"});
            }
            else {
                response.status(404).json({Status: "Error", Message: `Ticket with id '${uid}' not founded`});
            }
        }
        catch(error) {
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }

    static async generateTicket(request, response) {
        try {
            if (!request.session || !request.session.passport) {
                return response.status(400).json({ Status: "Error", Message: "Session closed or does not exist" });
            }

            if (!request.user) {
                return response.status(401).json({ Status: "Error", Message: "Unauthorized" });
            }

            const user = request.user;
            
            const newTicket = await TicketManager.generateTicket(user);

            return response.status(201).json({Status: "Success", Payload: newTicket});
        }
        catch(error) {
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }
}

module.exports = TicketManagerController;