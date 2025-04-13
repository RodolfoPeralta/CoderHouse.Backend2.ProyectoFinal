const ProductManager = require('../../managers/ProductManager');
const { Server } = require('socket.io');

const socketConfiguration = (server) => {

    const io = new Server(server);

    io.on("connection", async (socket) => {

        console.log(`A new user with id: ${socket.id} is connected.`);
        
        // Sends the products list from db when a new client is connected
        try {
            io.emit("products", await ProductManager.getProducts());
        }
        catch(error) {
            io.emit("error", []);
        }
        
        // Adds a new product and updates the products list on the view
        socket.on("addProduct", async (newProduct) => {
            try {
                await ProductManager.addProduct(newProduct);
                console.log(`'${newProduct.title}' product added to db.`);
                io.emit("products", await ProductManager.getProducts());
            }
            catch(error) {
                io.emit("error", []);
            }
        });
    
        // Deletes a product by Id and updates the products list on the view
        socket.on("deleteProduct", async (productId) => {
            try {
                await ProductManager.deleteProduct(productId);
                console.log(`Product with Id ${productId} deleted.`);
                io.emit("products", await ProductManager.getProducts());
            }
            catch(error) {
                io.emit("error", []);
            }
        });
    
        // Disconnection
        socket.on("disconnect", () => {
            console.log(`The user with id: ${socket.id} is disconnected.`);
        });
    });
};

module.exports = socketConfiguration;