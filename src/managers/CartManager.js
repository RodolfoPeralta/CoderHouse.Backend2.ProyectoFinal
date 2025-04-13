const MongoDbService = require('../services/MongoDbService');
const Carts = require('../models/Cart');
const Products = require('../models/Product');

class CartManager {

    // Public Methods

    // Gets all carts from db
    static async getCarts() {
        try {
            return await MongoDbService.getAll(Carts);
        }
        catch(error) {
            throw error;
        }
    }

    // Gets one cart by id
    static async getCartById(cid) {
        try {
            return await MongoDbService.getById(Carts, cid);
        }
        catch(error) {
            throw error;
        }
    }

    // Creates a new cart
    static async createCart() {
        try {
            return await MongoDbService.createOne(Carts);
        }
        catch (error) {
            throw error;
        }
    }

    // Adds an specific product to a cart
    static async addProductToCart(cid, pid) {
        try {
            const cart = await MongoDbService.getById(Carts, cid);

            if(!cart) {
                throw new Error(`Cart with id '${cid}' not founded`);
            }

            const product = await MongoDbService.getById(Products, pid);

            if(!product) {
                throw new Error(`Product with id '${pid}' not founded`);
            }

            const pIndex = cart.products.findIndex(item => item.product._id == pid);
            
            if(pIndex !== -1) {
                cart.products[pIndex].quantity += 1;
            }
            else {
                cart.products.push({ product: pid, quantity: 1 });
            }

            return await MongoDbService.updateById(Carts, cart, cid);
        }
        catch (error) {
            throw error;
        }
    }

    // Deletes a products list to cart by id
    static async deleteProductsToCartById(id) {
        try {
            const cart = await MongoDbService.getById(Carts, id);

            if(!cart) {
                throw new Error(`Cart with id '${cid}' not founded`);
            }

            cart.products = [];

            return await MongoDbService.updateById(Carts, cart, id);
        }
        catch(error) {
            throw error;
        }
    }

    static async deleteProductFromCartById(cid, pid) {
        try {

            const cart = await MongoDbService.getById(Carts, cid);

            if(!cart) {
                throw new Error(`Cart with id '${cid}' not founded`);
            }

            const product = await MongoDbService.getById(Products, pid);

            if(!product) {
                throw new Error(`Product with id '${pid}' not founded`);
            }

            const pIndex = cart.products.findIndex(item => item.product == pid);

            if(pIndex !== -1) {
                cart.products.splice(pIndex, 1);
            }
            else {
                throw new Error(`Product with id '${pid}' not founded on Cart with id '${cid}'`);
            }

            return await MongoDbService.updateById(Carts, cart, cid);
        }
        catch(error) {
            throw error;
        }
    }

    static async updateAllProductsFromCart(products, cid) {
        try {

            const cart = await MongoDbService.getById(Carts, cid);

            if(!cart) {
                throw new Error(`Cart with id '${cid}' not founded`);
            }

            cart.products = products;

            return await MongoDbService.updateById(Carts, cart, cid);
        }
        catch(error) {
            throw error;
        }
    }

    static async updateProductFromCartById(quantity, cid, pid) {
        try {
            const cart = await MongoDbService.getById(Carts, cid);

            if(!cart) {
                throw new Error(`Cart with id '${cid}' not founded`);
            }

            const product = await MongoDbService.getById(Products, pid);

            if(!product) {
                throw new Error(`Product with id '${pid}' not founded`);
            }

            const pIndex = cart.products.findIndex(p => p.product._id == pid);

            if (pIndex === -1) {
                throw new Error(`Product with id '${pid}' not found in cart '${cid}'`);
            }

            cart.products[pIndex].quantity = quantity;

            return await MongoDbService.updateById(Carts, cart, cid);
        }
        catch(error) {
            throw error;
        }
    }
}

module.exports = CartManager;