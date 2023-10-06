const AuthService = require("../services/auth.service");
const { Created, SuccessResponse } = require("../utils/success.response");

class AuthController {
  login = async (req, res, next) => {
    new SuccessResponse({
      data: await AuthService.login(req.body),
    }).send(res);
  };

  signUp = async (req, res, next) => {
    return new Created({
      message: "Registerd successfully",
      data: await AuthService.signUp(req.body),
      options: {
        limit: 10,
      },
    }).send(res);
  };
}

const authController = new AuthController();
module.exports = authController;
