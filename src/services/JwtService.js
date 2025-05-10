const jwt = require('jsonwebtoken');
require("dotenv").config();

class JwtService {

    // Public Methods

    // Generates user token
    static generateToken(user) {
        const payload = {
            _id: user._id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            age: user.age,
            role: user.role
        };

        return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "10m"});
    }

    // Generates reset password token
    static generatePasswordToken(email) {
        return jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: "1h"});
    }

    // Verifies token
    static verifyToken(token) {
        return jwt.verify(token, process.env.JWT_SECRET);
    }
}

module.exports = JwtService;