const AuthService = require("../services/auth.service");

class AuthController {
  signUp = async (req, res, next) => {
    try {
      return res.status(201).json(await AuthService.signUp(req.body));
    } catch (error) {
      next(error);
    }
  };
}

const authController = new AuthController();
module.exports = authController;
