const mongoose = require('mongoose');

const cartsCollection = "Cart";

const cartsSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            quantity: {type: Number, default: 1 }
        }
    ]
});

// populate

cartsSchema.pre('find', function() {
    this.populate("products.product", "_id title description price status stock category");
});

cartsSchema.pre('findOne', function() {
    this.populate("products.product", "_id title description price status stock category");
});

const Cart = mongoose.model(cartsCollection, cartsSchema);

module.exports = Cart;