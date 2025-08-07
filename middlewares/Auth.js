const jwt = require('jsonwebtoken');

function CheckAuth(req, res, next) {

    const token = req.cookies?.Access_Token;
    if (!token) {
        return res.status(400).send("Token is required");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(400).send("Invalid token");
        }
        req.user = decoded.userData;
        next();
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports = CheckAuth;