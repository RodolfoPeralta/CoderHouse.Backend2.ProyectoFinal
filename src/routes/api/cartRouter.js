const express = require('express');
const router = express.Router();
const CartManagerController = require('../../controllers/CartManagerController');
const Middlewares = require('../../Middlewares/Middlewares');

router.get('/', Middlewares.authorization("admin"), async (request,response) => await CartManagerController.getCarts(request, response));
router.get('/:id', Middlewares.authorization("admin"), async (request, response) => await CartManagerController.getCartById(request, response));
router.post('/', Middlewares.authorization("admin"), async (request, response) => await CartManagerController.createCart(request, response));
router.post('/:cid/product/:pid', Middlewares.authorization("admin"), async (request, response) => await CartManagerController.addProductToCart(request, response));
router.put('/:cid', Middlewares.authorization("admin"), async (request, response) => await CartManagerController.updateAllProductsFromCart(request, response));
router.put('/:cid/product/:pid', Middlewares.authorization("admin"), async (request,response) => await CartManagerController.updateProductFromCartById(request, response));
router.delete('/:cid', Middlewares.authorization("admin"), async (request, response) => await CartManagerController.deleteProductsToCartById(request, response));
router.delete('/:cid/product/:pid', Middlewares.authorization("admin"), async (request, response) => await CartManagerController.deleteProductFromCartById(request, response));

module.exports = router;