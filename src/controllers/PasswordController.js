const UserManager = require("../managers/UserManager");
const EmailService = require("../services/EmailService");
const JwtService = require("../services/JwtService");
const BcryptUtils = require("../Utils/BcryptUtils");


class PasswordController {

    // Public Methods

    static async forgotPassword(request, response) {
        try {
            const { email } = request.body;

            if(!email) {
                return response.status(400).json({Status: "Error", Message: "Email parameter does not exist or is empty"});
            }

            const user = await UserManager.getUserByEmail(email);

            if(!user) {
                return response.status(404).json({Status: "Error", Message: `User with email '${email}' not founded`});
            }

            const token = JwtService.generatePasswordToken(email);

            await EmailService.sendResetPasswordEmail(user, token);

            if(request.is('application/x-www-form-urlencoded')) {
                return response.redirect("/login");
            }

            return response.status(200).json({ Status: "Success", Message: "Recovery email sent", Token: token });
        }
        catch(error) {
            return response.status(500).json({ Status: "Error", Message: error });
        }
    }

    static async resetPassword(request, response) {
        try {

            const {email, password, token } = request.body;

            if(!email) {
                return response.status(400).json({Status: "Error", Message: "Email parameter does not exist or is empty"});
            }

            if(!password) {
                return response.status(400).json({Status: "Error", Message: "Password parameter does not exist or is empty"});
            }

            if(!token) {
                return response.status(400).json({Status: "Error", Message: "Token does not exist or is empty"});
            }

            try {
                const payload = JwtService.verifyToken(token);
                if (payload.email !== email) {
                    return response.status(403).json({ Status: "Error", Message: "Invalid token or email" });
                }
            } catch (error) {
                return response.status(403).json({ Status: "Error", Message: "Token expired or invalid" });
            }

            const user = await UserManager.getUserByEmail(email);

            if(!user) {
                return response.status(404).json({Status: "Error", Message: `User with email '${email}' not founded`});
            }

            const isSamePassword = BcryptUtils.validatePassword(password, user.password);

            if(isSamePassword) {
                return response.status(400).json({Status: "Error", Message: "Password parameter must be different from the current"});
            }

            const updatedUser = {
                ...user,
                password: BcryptUtils.createHash(password)
            }

            if(await UserManager.updateUser(user._id, updatedUser)) {
                if(request.is('application/x-www-form-urlencoded')) {
                    return response.redirect("/login");
                }
                else {
                    return response.status(200).json({Status: "Success", Message: `Password reset successfully`});
                }
            }
            else {
                throw("Error resetting password");
            }
        }
        catch(error) {
            return response.status(500).json({ Status: "Error", Message: error });
        }
    }
}

module.exports = PasswordController;