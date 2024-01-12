const express = require("express");
const authController = require("../controllers/authController");
const authRouter = express.Router();

authRouter.get("/login", authController.getLogin);
authRouter.post("/login", authController.postLogin);

authRouter.get("/register", authController.getRegister);
authRouter.post("/register", authController.postRegister);

authRouter.get("/logout", authController.getLogout);

module.exports = authRouter;
