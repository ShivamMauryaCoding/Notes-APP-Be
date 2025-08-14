const jwt = require("jsonwebtoken");

const CheckAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({ message: "Token not found" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "shivam");
    req.user = decoded.userData;
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error verifying token", error: error.message });
  }
};

module.exports = CheckAuth;
