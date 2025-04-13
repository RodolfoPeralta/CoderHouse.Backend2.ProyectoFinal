const express = require('express');
const router = express.Router();
const ProductManagerController = require('../../controllers/ProductManagerController');
const Middlewares = require('../../Middlewares/Middlewares');

router.get('/', async (request, response) => await ProductManagerController.getProducts(request, response));
router.get('/:id', async (request, response) => await ProductManagerController.getProductById(request, response));
router.post('/', Middlewares.authorization("admin"), async (request, response) => await ProductManagerController.addProduct(request, response));
router.put('/:id', Middlewares.authorization("admin"), async (request, response) => await ProductManagerController.updateProduct(request, response));
router.delete('/:id', Middlewares.authorization("admin"), async (request, response) => await ProductManagerController.deleteProduct(request,response));

module.exports = router;