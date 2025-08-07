const express = require('express');
const userController = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.post("/register", userController.Register);
userRouter.post("/login", userController.Login);
userRouter.get("/logout", userController.Logout);

module.exports = userRouter;