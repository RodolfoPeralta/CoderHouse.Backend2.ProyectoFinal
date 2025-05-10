const mongoose = require("mongoose");

const ticketsCollection = "Ticket";

const ticketsSchema = new mongoose.Schema({
    code: {type: String, required: true, unique: true },
    purchase_datetime: { type: String, required: true},
    amount: {type: Number, required: true },
    purchaser: {type: String, required: true },
    cart: { type: mongoose.Schema.Types.ObjectId,
            ref: "Cart"
    }
});

// populate

ticketsSchema.pre('find', function() {
    this.populate("cart");
});

ticketsSchema.pre('findOne', function() {
    this.populate("cart");
});

const Ticket = mongoose.model(ticketsCollection, ticketsSchema);

module.exports = Ticket;