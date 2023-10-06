const express = require("express");
const authController = require("../../controllers/auth.controller");
const authRouter = express.Router();
// sign up
authRouter.post("/signup", authController.signUp);

module.exports = authRouter;
