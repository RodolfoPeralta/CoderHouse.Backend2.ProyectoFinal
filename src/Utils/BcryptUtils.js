const bcrypt = require("bcrypt");

class BcryptUtils {

    // Public Methods

    // Bcrypt

    static createHash(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }

    static validatePassword(password, hash) {
        return bcrypt.compareSync(password, hash);
    }
}

module.exports = BcryptUtils;