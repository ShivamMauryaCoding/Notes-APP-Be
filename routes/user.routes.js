const express = require("express");
const {
  registerUser,
  loginUser,
  userLogout,
} = require("../controllers/user.controller");
const useRouter = express.Router();

useRouter.post("/register", registerUser);
useRouter.post("/login", loginUser);
useRouter.get("/logout", userLogout);

module.exports = useRouter;
