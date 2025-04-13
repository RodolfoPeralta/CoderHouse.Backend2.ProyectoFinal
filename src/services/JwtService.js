const jwt = require('jsonwebtoken');
require("dotenv").config();

class JwtService {

    // Public Methods

    static generateToken(user) {
        const payload = {
            _id: user._id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            age: user.age,
            role: user.role
        };

        return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "5m"});
    }
}

module.exports = JwtService;