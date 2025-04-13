const passport = require("passport");

class PassportService {

    // Public Methods

    static PassportCallBack(strategy, options = {}) {
        return (request, response, next) => {
            passport.authenticate(strategy, options, (error, user, info) => {
                if(error) {
                    return next(error);
                }

                if(!user) {
                    request.user = null;
                    return response.status(401).json({Status: "Error", Message: info.message || info || "Unauthorized" });
                }

                request.user = user;
                next();
            })(request, response, next);
        }
    }
}

module.exports = PassportService;