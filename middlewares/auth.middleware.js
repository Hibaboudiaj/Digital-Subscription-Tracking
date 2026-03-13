const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "لم يتم تقديم رمز مميز" });
    }

    const token = authHeader.split(" ")[1];

    // تحقق من token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // نجيبو user من DB بدون كلمة السر
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Non autorisé" });
  }
};

module.exports = authMiddleware;