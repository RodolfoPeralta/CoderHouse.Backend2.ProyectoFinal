const mongoose = require("mongoose");

const usersCollection = "User";

const userSchema = new mongoose.Schema ({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true, unique:true },
    age: {type: Number, required: true},
    password: {type: String, required: true},
    cart: {type: String},
    role: {type: String, default: "user"}
});

const Users = mongoose.model(usersCollection, userSchema);

module.exports = Users;