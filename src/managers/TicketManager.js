const MongoDbService = require("../services/MongoDbService");
const Ticket = require("../models/Ticket");
const CartManager = require("./CartManager");
const ProductManager = require("./ProductManager");
const EmailService = require("../services/EmailService");
const Products = require("../models/Product");

class TicketManager {

    // Public Methods

    static async getTickets() {
        try {
            return await MongoDbService.getAll(Ticket);
        }
        catch(error) {
            throw error;
        }
    }

    static async getTicketById(id) {
        try {
            return await MongoDbService.getById(Ticket, id);
        }
        catch(error) {
            throw error;
        }
    }

    static async createTicket(ticket) {
        try {
            return await MongoDbService.createOne(Ticket, ticket)
        }
        catch(error) {
            throw error;
        }
    }

    static async updateTicketById(id, ticket) {
        try {
            return await MongoDbService.updateById(Ticket, ticket, id);
        }
        catch(error) {
            throw error;
        }
    }

    static async deleteTicketById(id) {
        try {
            return await MongoDbService.deleteById(Ticket, id);
        }
        catch(error) {
            throw error;
        }
    }

    static async generateTicket(user) {
        try {
            let totalAmount = 0;
            let notCompleted = [];
            let purchasedProducts = [];

            const cart = await CartManager.getCartById(user.cart);

            if (!cart || cart.products.length === 0) {
                throw("Cart doesn't exist or is empty");
            }

            for (const cartItem of cart.products) {
                const productId = cartItem.product;
                const dbProduct = await ProductManager.getProductById(productId);
    
                if (!dbProduct) {
                    notCompleted.push(cartItem);
                    continue;
                }
    
                if (cartItem.quantity > dbProduct.stock) {
                    notCompleted.push(cartItem);
                    continue;
                }
    
                const amount = cartItem.quantity * dbProduct.price;
                totalAmount += amount;
                purchasedProducts.push(cartItem);

                dbProduct.stock -= cartItem.quantity;
                await Products.updateOne(
                    { _id: productId },
                    { $inc: { stock: -cartItem.quantity } }
                );
            }

            if (purchasedProducts.length === 0) {
                return {
                    status: "Not Completed",
                    message: "No products could be purchased",
                    notProcessed: notCompleted.map(p => p.product)
                };
            }

            const ticket = {
                code: `${Math.random().toString(36).substring(2, 10)}`,
                purchase_datetime: new Date().toLocaleString(),
                amount: totalAmount,
                purchaser: user.email
            }

            await MongoDbService.createOne(Ticket, ticket);

            await CartManager.updateAllProductsFromCart([], cart._id);

            const response = {
                status: notCompleted.length === 0 ? "Success" : "Partial",
                ticket,
                notProcessed: notCompleted.map(p => p.product)
            };

            await EmailService.sendGeneratedTicketEmail(user, response);

            return response;
        }
        catch(error) {
            throw error;
        }
    }
}

module.exports = TicketManager;