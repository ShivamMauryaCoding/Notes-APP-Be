const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  // Perform validation and create user logic here
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const isuserExist = await userModel.findOne({ email: req.body.email });
    if (isuserExist) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hash = await bcrypt.hash(req.body.password, 5);
    if (!hash) {
      return res.status(500).json({ message: "Error while hashing password" });
    }
    await userModel.create({ ...req.body, password: hash });
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const isuserExist = await userModel.findOne({ email: req.body.email });
    if (!isuserExist) {
      return res
        .status(400)
        .json({ message: "User does not exist. Register first to login" });
    }
    const result = await bcrypt.compare(
      req.body.password,
      isuserExist.password
    );
    if (!result) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userData: isuserExist }, "shivam", {
      expiresIn: "7d",
    });
    if (!token) {
      return res.status(500).json({ message: "Error while generating token" });
    }
    res.cookie("Access_Token", token);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(400).json({ message: error.message });
  }
};

const userLogout = (req, res) => {
  console.log(req.cookies.userdata);
  try {
    if (!req.cookies.userdata) {
      res.status;
    }
    res.clearCookie("userdata");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Error logging out user:", error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, userLogout };
