const User = require('../models/User');
const MongoDbService = require('../services/MongoDbService');

class UserManager {
    
    // Public Methods

    // Get all users from db
    static async getUsers() {
        try {
            return await MongoDbService.getAll(User);
        }
        catch(error) {
            throw error;
        }
    }

    // Get user By Id
    static async getUserById(uid) {
        try {
            return await MongoDbService.getById(User, uid);
        }
        catch(error) {
            throw error;
        }
    }

    // Get user by email
    static async getUserByEmail(email) {
        try {

            const options = {
                query: {email: email}
            }

            const results = await MongoDbService.aggregate(User, options);

            return results[0] || null;
        }
        catch(error) {
            throw error;
        }
    }

    // Create a new user
    static async addUser(user) {
        try {
            return await MongoDbService.createOne(User, user);
        }
        catch(error) {
            throw error;
        }
    }

    // Update a user
    static async updateUser(uid, user) {
        try {
            return await MongoDbService.updateById(User, user, uid);
        }
        catch(error) {
            throw error;
        }
    }

    // Delete user by id
    static async deleteUserById(uid) {
        try {
            return await MongoDbService.deleteById(User, uid);
        }
        catch(error) {
            throw error;
        }
    }
}

module.exports = UserManager;