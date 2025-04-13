const express = require('express');
const router = express.Router();
const CartManagerController = require('../../controllers/CartManagerController');

router.get('/', async (request,response) => await CartManagerController.getCarts(request, response));
router.get('/:id', async (request, response) => await CartManagerController.getCartById(request, response));
router.post('/', async (request, response) => await CartManagerController.createCart(request, response));
router.post('/:cid/product/:pid', async (request, response) => await CartManagerController.addProductToCart(request, response));
router.put('/:cid', async (request, response) => await CartManagerController.updateAllProductsFromCart(request, response));
router.put('/:cid/product/:pid', async (request,response) => await CartManagerController.updateProductFromCartById(request, response));
router.delete('/:cid', async (request, response) => await CartManagerController.deleteProductsToCartById(request, response));
router.delete('/:cid/product/:pid', async (request, response) => await CartManagerController.deleteProductFromCartById(request, response));

module.exports = router;