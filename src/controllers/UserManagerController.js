const UserManager = require('../managers/UserManager');
const AuthService = require('../Utils/BcryptUtils');

class UserManagerController {

    // Public Methods

    // Get all users from db
    static async getUsers(request, response) {
        try {
            const users = await UserManager.getUsers();

            return response.status(200).json(users);
        }
        catch(error) {
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }

    // Get user By Id
    static async getUserById(request, response) {
        try {
            const uid = request.params.uid;

            if(!uid) {
                return response.status(400).json({Status: "Error", Message: `User Id parameter is required.`});
            }

            const user = await UserManager.getUserById(uid);

            if(!user) {
                return response.status(404).json({Status: "Error", Message: `User with Id '${uid}' not found`});
            }

            return response.status(200).json(user);
        }
        catch(error) {
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }

    // Create a new user
    static async addUser(request, response) {
        try {
            const { first_name, last_name, email, age, password, cart, role } = request.body;

            if(!first_name || !last_name || !email || !age || !password) {
                return response.status(400).json({Status: "Error", Message: "Some parameter does not exist or is empty"});
            }

            const user = {
                first_name,
                last_name,
                email,
                age,
                password: AuthService.createHash(password),
                cart,
                role
            };

            const newUser = await UserManager.addUser(user);

            return response.status(201).json(newUser);
        }
        catch(error) {
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }

    // Update a user
    static async updateUser(request, response) {
        try {
            const uid = request.params.uid;
            const { first_name, last_name, email, age, password, cart, role } = request.body;

            if(!uid) {
                return response.status(400).json({Status: "Error", Message: `User Id parameter is required.`});
            }

            if(!first_name || !last_name || !email || !age || !password) {
                return response.status(400).json({Status: "Error", Message: "Some parameter does not exist or is empty"});
            }

            const user = {
                first_name,
                last_name,
                email,
                age,
                password: AuthService.createHash(password),
                cart,
                role
            };

            if(await UserManager.updateUser(uid, user)) {
                return response.status(200).json({Status: "Success", Message: `User with id '${uid}' updated`});
            }
            else {
                return response.status(404).json({Status: "Error", Message: `User with id '${uid}' not founded`});
            }
        }
        catch(error) {
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }

    // Delete user by id
    static async deleteUserById(request, response) {
        try {
            const uid = request.params.uid;

            if(!uid) {
                return response.status(400).json({Status: "Error", Message: `User Id parameter is required.`});
            }

            if(await UserManager.deleteUserById(uid)) {
                response.status(200).json({Status: "Success", Message: "User deleted"});
            }
            else {
                response.status(404).json({Status: "Error", Message: `User with id '${uid}' not founded`});
            }
        }
        catch(error) {
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }

    static async deleteAllUsers(request, response) {
        try {
            if(await UserManager.deleteAllUsers()) {
                return response.status(200).json({Status: "Success", Message: "All users deleted"});
            }
        }
        catch(error) {
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }
}

module.exports = UserManagerController;