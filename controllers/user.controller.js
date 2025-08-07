const userModel = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.Register = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const isExisting = await userModel.findOne({ email: req.body.email });
        if (isExisting) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        if (!hashedPassword) {
            return res.status(500).json({ message: 'Error hashing password' });
        }

        await userModel.create({ ...req.body, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

module.exports.Login = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const isExistingUser = await userModel.findOne({ email: req.body.email });
        if (!isExistingUser) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        const result = await bcrypt.compare(req.body.password, isExistingUser.password);
        if (!result) {
            return res.status(400).json({ message: 'password is incorrect' });
        }

        const token = jwt.sign({userData: isExistingUser}, process.env.JWT_SECRET ,{ expiresIn: '7d' });
        if (!token) {
            return res.status(500).json({ message: 'Error generating token' });
        }

        res.cookie("Access_Token", token);
        res.status(200).json({ message: 'User login successful' , user: isExistingUser });

    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

module.exports.Logout = (req, res) => {
    if (!req.cookies.Access_Token) {
        return res.status(400).json({ message: 'No user is logged in' });
    }

    res.clearCookie("Access_Token");
    res.status(200).json({ message: 'User logged out successfully' });
}