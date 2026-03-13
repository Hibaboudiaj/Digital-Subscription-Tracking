const roleMiddleWare = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({message: "Non autorisé"})
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({message: "Interdit : Rôle insuffisant"})
    }
    next();
  };
};

module.exports = roleMiddleWareyes
