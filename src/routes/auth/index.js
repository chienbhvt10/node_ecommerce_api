const express = require("express");
const authController = require("../../controllers/auth.controller");
const { handleError } = require("../../middleware/handle.error.middleware");
const authRouter = express.Router();
// sign up
authRouter.post("/signup", handleError(authController.signUp));

module.exports = authRouter;
