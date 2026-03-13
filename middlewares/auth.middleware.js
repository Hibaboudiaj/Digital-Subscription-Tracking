const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

//===================middleware pour verifier jwt=====================//
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authorization || !authorization.startsWitch("Bearer")) {
      return res.status(401).json({ message: "لم يتم تقديم رمز مميز" });
    }

    const token = authHeader.split(" ")[1];
    // 2️⃣ تحقق من token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // 3️⃣ نجيبو user من DB
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ massege: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Non autorisé" });
  }
};

module.exports = authMiddleware;
