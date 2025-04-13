const mongoose = require('mongoose');

const mongoConnection = async (db) => {
    try {
        await mongoose.connect(db);
        console.log("Connection with MongoDB established.");
    }
    catch(error) {
        console.log(`Error when trying to connect with MongoDB. Message: ${error}`);
    }
}

module.exports = mongoConnection;