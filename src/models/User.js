const mongoose = require("mongoose");
const MongoDbService = require("../services/MongoDbService");

const usersCollection = "User";

const userSchema = new mongoose.Schema ({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true, unique:true },
    age: {type: Number, required: true},
    password: {type: String, required: true},
    cart: { type: mongoose.Schema.Types.ObjectId,
                ref: "Cart"
        },
    role: {type: String, default: "user"}
});

// populate

userSchema.pre('find', function() {
    this.populate("cart");
});

userSchema.pre('findOne', function() {
    this.populate("cart");
});

const Users = mongoose.model(usersCollection, userSchema);

module.exports = Users;