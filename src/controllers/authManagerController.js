const passport = require("passport");
const JwtService = require("../services/JwtService");

class AuthManagerController {

    // Public Methods

    static register(request, response) {
        try {
            if(request.error) {
                throw request.error;
            }

            if(!request.user) {
                if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
                    return response.redirect("/register");
                }

                return response.status(400).json({ Status: "Error", Message: "User  registration failed." });
            }

            request.login(request.user, (err) => {
                
                if(!(request.headers['content-type'] === 'application/x-www-form-urlencoded')) {
                    const token = JwtService.generateToken(request.user);
                    return response.header("Authorization", `Bearer ${token}`).status(200).json({ Status: "Success", Token: token, Payload: request.user });
                }

                return response.redirect("/");
            });
        }
        catch(error) {
            return response.status(500).json({Status: "Error", Message: error});
        }  
    }

    static login(request, response) {
        try {
            if (request.error) {
                throw request.error;
            }

            request.login(request.user, (err) => {
                
                if(!(request.headers['content-type'] === 'application/x-www-form-urlencoded')) {
                    const token = JwtService.generateToken(request.user);
                    return response.header("Authorization", `Bearer ${token}`).status(200).json({ Status: "Success", Token: token, Payload: request.user });
                }

                return response.redirect("/");
                
            });  
        } 
        catch (error) {
            return response.status(500).json({Status: "Error", Message: error});
        }
    }

    static logout(request, response) {
        try {
            if (!request.session || !request.session.passport) {
                return response.status(400).json({ Status: "Error", Message: "Session already closed or does not exist" });
            }

            request.session.destroy((err) => {
                if(err) {
                    return response.status(500).json({ Status: "Error", Message: "Error closing session" });
                }
            
                if(!(request.headers['content-type'] === 'application/x-www-form-urlencoded')) {
                    return response.status(200).json({ Status: "Success", Message: "Closed session" });
                }

                return response.redirect("/login");
                
            });
        }
        catch(error) {
            return response.status(500).json({ Status: "Error", Message: error });
        }
    }

    static getCurrentUser(request, response) {
        try {
            if (!request.user) {
                return response.status(401).json({ Status: "Error", Message: "Unauthorized" });
            }

            if(request.user) {
                if(!(request.headers['content-type'] === 'application/x-www-form-urlencoded')) {
                    return response.status(200).json({ Status: "Success", Payload: request.user });
                }
            }
        } catch (error) {
            return response.status(500).json({ Status: "Error", Message: error });
        }
    }
}

module.exports = AuthManagerController;