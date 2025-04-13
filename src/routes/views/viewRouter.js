const express = require('express');
const ProductManager = require('../../managers/ProductManager');
const CartManager = require('../../managers/CartManager');
const Middlewares = require('../../Middlewares/Middlewares');
const router = express.Router();

router.get("/products", async (request, response) => {
    try {

        let { page = 1, limit = 10, sort = 1 } = request.query;

        page = parseInt(page);
        limit = parseInt(limit);

        const sortOption = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {};

        const options = {
            page,
            limit,
            sort: sortOption,
        }

        const result = await ProductManager.getWithPaginate({}, options);
        const carts = await CartManager.getCarts();

        response.render("products", {
            products: result.docs,
            page: result.page,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            totalPages: result.totalPages,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            carts,
            error: false
        });
    }
    catch(error) {
        response.render("products", {
            products: [],
            error: true
        });
    }
});

router.get("/products/:pid", async (request, response) => {
    try {
        const pid = request.params.pid;

        if(!pid) {
            throw new Error();
        }

        const product = await ProductManager.getProductById(pid);
        
        response.render("productDetails", {
            product,
            error: false
        });
    }
    catch(error) {
        response.render("productDetails", {
            product: {},
            error: true
        });
    }
})

router.get("/carts", Middlewares.authorization("admin"), async (request, response) => {
    try {
        const carts = await CartManager.getCarts();
        
        response.render("carts", {
            carts,
            error: false
        });
    }
    catch(error) {
        response.render("carts", {
            carts: [],
            error: true
        });
    }
})

router.get("/carts/:cid", async (request, response) => {
    try {
        const cid = request.params.cid;

        if(!cid) {
            throw new Error();
        }

        const cart = await CartManager.getCartById(cid);

        const products = cart.products.map(i => ({
            title: i.product.title, 
            description: i.product.description,
            price: i.product.price,
            quantity: i.quantity
        }));
        
        if(!cart) {
            throw new Error();
        }

        response.render("cartProductList", {
            products: products,
            error: false
        });
    }
    catch(error) {
        response.render("cartProductList", {
            products: [],
            error: true
        });
    }
})

router.get("/realTimeProducts", async (request, response) => {
    response.render("realTimeProducts");
});

module.exports = router;