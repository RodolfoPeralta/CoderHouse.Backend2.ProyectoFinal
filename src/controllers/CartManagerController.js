const CartManager = require('../managers/CartManager');
const MongoDbService = require('../services/MongoDbService');

class CartManagerController {

    // Public Methods

    // Gets carts from db
    static async getCarts(request, response) {
        try {
            const carts = await CartManager.getCarts();

            return response.status(200).json(carts);
        }
        catch(error) {
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }

    // Gets carts by id from db
    static async getCartById(request, response) {
        try {
            const cid = request.params.id;
        
            if(!cid) {
                return response.status(400).json({Status: "Error", Message: "Cart Id parameter is required"});
            }

            const cart = await CartManager.getCartById(cid);

            if(!cart) {
                return response.status(404).json({Status: "Error", Message: `Cart with id '${cid}' not founded`});
            }

            return response.status(200).json(cart);
        }
        catch(error) {
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }

    // Creates a new cart to db
    static async createCart(request, response) {
        try {
            return response.status(201).json(await CartManager.createCart());
        }
        catch(error) {
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }

    // Adds an specific product to an existing cart
    static async addProductToCart(request, response) {
        try {
            const cid = request.params.cid;
            const pid = request.params.pid;

            if(!cid) {
                return response.status(400).json({Status: "Error", Message: "Cart Id parameter is required"});
            }

            if(!pid) {
                return response.status(400).json({Status: "Error", Message: "Product Id parameter is required"});
            }

            const cart = await CartManager.addProductToCart(cid, pid);

            if(!cart) {
                return response.status(404).json({Status: "Error", Message: `Cart with id '${cid}' not founded`});
            }

            return response.status(201).json({Status: "Success", Message: "Product added to cart."});
        }
        catch(error) {
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }

    // Updates a product list from an existing cart
    static async updateAllProductsFromCart(request, response) {
        try {
            const cid = request.params.cid;
            const products = request.body;

            if(!cid) {
                return response.status(400).json({Status: "Error", Message: "Cart Id parameter is required"});
            }

            if(!products) {
                return response.status(400).json({Status: "Error", Message: "A list of products is required"});
            }

            const updatedCart = await CartManager.updateAllProductsFromCart(products, cid);

            if(!updatedCart) {
                throw new Error(`Error updating cart with id '${cid}'`);
            }

            return response.status(200).json({Status: "Success", Message: "All products updated."});
        }
        catch(error) {
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }

    // Updates a product's quantity from an existing cart
    static async updateProductFromCartById(request, response) {
        try {
            const cid = request.params.cid;
            const pid = request.params.pid;
            let { quantity } = request.body;
            
            if(!cid) {
                return response.status(400).json({Status: "Error", Message: "Cart Id parameter is required"});
            }

            if(!pid) {
                return response.status(400).json({Status: "Error", Message: "Product Id parameter is required"});
            }

            quantity = parseInt(quantity);

            if(!quantity || typeof quantity !== "number") {
                return response.status(400).json({Status: "Error", Message: "Quantity parameter is required as a number"});
            }

            const updatedCart = await CartManager.updateProductFromCartById(quantity, cid, pid);

            if(!updatedCart) {
                throw new Error(`Error updating cart with id '${cid}'`);
            }

            return response.status(200).json({Status: "Success", Message: `Product's quantity updated to ${quantity}`});
        }
        catch(error) {
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }

    // Deletes a products list from cart by id
    static async deleteProductsToCartById(request, response) {
        try {
            const cid = request.params.cid;

            if(!cid) {
                return response.status(400).json({Status: "Error", Message: "Cart Id parameter is required"});
            }

            if(await CartManager.deleteProductsToCartById(cid)) {
                return response.status(200).json({Status: "Success", Message: `Product list deleted from cart with id '${cid}'`});
            }
            else {
                return response.status(404).json({Status: "Error", Message: `Cart with id '${id}' not founded`});
            }
        }
        catch(error) {
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }

    // Deletes a product from an existing cart
    static async deleteProductFromCartById(request, response) {
        try {
            const cid = request.params.cid;
            const pid = request.params.pid;

            if(!cid) {
                return response.status(400).json({Status: "Error", Message: "Cart Id parameter is required"});
            }

            if(!pid) {
                return response.status(400).json({Status: "Error", Message: "Product Id parameter is required"});
            }

            if(await CartManager.deleteProductFromCartById(cid, pid)) {
                return response.status(200).json({Status: "Success", Message: "Product deleted"});
            }
            else {
                return response.status(404).json({Status: "Error", Message: `Product with id '${pid}' not founded in Cart`});
            }
        }
        catch(error) {
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }
}

module.exports = CartManagerController;