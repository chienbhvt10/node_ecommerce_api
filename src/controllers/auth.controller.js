const AuthService = require("../services/auth.service");
const { Created } = require("../utils/success.response");

class AuthController {
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
