const ProductManager = require('../managers/ProductManager');

class ProductManagerController {

    // Public Methods

    // Gets products from db
    static async getProducts(request, response) {
        try {
            let { limit = 10, page = 1, query = '{}', sort} = request.query;
            
            limit = parseInt(limit);
            page = parseInt(page);

            try {
                query = JSON.parse(query);
            }
            catch(error) {
                return response.status(400).json({Status: "Error", Message: "Error with the query format from query params"});
            }
            
            const sortOption = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : null;

            const options = {
                limit,
                page,
                sort: sortOption
            }

            const result = await ProductManager.getWithPaginate(query, options);
            
            const totalResponse = {
                status: "success",
                payload: result.docs,
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink: result.hasPrevPage ? `/api/products?page=${result.prevPage}&limit=${result.limit}` : null,
                nextLink: result.hasNextPage ? `/api/products?page=${result.nextPage}&limit=${result.limit}` : null
            }

            return response.status(200).json(totalResponse);
        }
        catch(error) {
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }

    // Gets a product by id from db
    static async getProductById(request, response) {
        try {
            const id = request.params.id;

            if(!id) {
                return response.status(400).json({Status: "Error", Message: "Product Id parameter is required"});
            }

            const product = await ProductManager.getProductById(id);
    
            if(!product) {
                return response.status(404).json({Status: "Error", Message: `product with id '${id}' not founded`});
            }
    
            return response.status(200).json(product);
        }
        catch(error) {
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }

    // Adds an specific product to db
    static async addProduct(request, response) {
        try {
            const {title, description, code, price, status, stock, category, thumbnails} = request.body;

            const product = {
                title: title,
                description: description,
                code: code,
                price: price,
                status: status,
                stock: stock,
                category: category,
                thumbnails: thumbnails
            };

            const newProduct = await ProductManager.addProduct(product);

            return response.status(201).json(newProduct);
        }
        catch(error) {
            return response.status(500).json({Status: "Error", Message: `${error}`});
        } 
    }

    // Updates a product by id to db
    static async updateProduct(request, response) {
        try {
            const id = request.params.id;

            if(!id) {
                return response.status(400).json({Status: "Error", Message: "Product Id parameter is required"});
            }

            const {title, description, code, price, status, stock, category, thumbnails} = request.body;

            const product = {
                title: title,
                description: description,
                code: code,
                price: price,
                status: status,
                stock: stock,
                category: category,
                thumbnails: thumbnails
            };
            
            if(await ProductManager.updateProduct(id, product)) {
                return response.status(200).json({Status: "Success", Message: `Product with id '${id}' updated`});
            }
            else {
                return response.status(404).json({Status: "Error", Message: `Product with id '${id}' not founded`});
            }
        }
        catch(error) {
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }

    // Deletes a product by id to db
    static async deleteProduct(request, response) {
        try {
            const id = request.params.id;

            if(!id) {
                return response.status(400).json({Status: "Error", Message: "Product Id parameter is required"});
            }

            if(await ProductManager.deleteProduct(id)) {
                response.status(200).json({Status: "Success", Message: "Product deleted"});
            }
            else {
                response.status(404).json({Status: "Error", Message: `product with id '${id}' not founded`});
            }
        }
        catch(error) {
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }
}

module.exports = ProductManagerController;