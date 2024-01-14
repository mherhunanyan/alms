const User = require("../models/user");

const sessionMiddleware = async (req, res, next) => {
  if (!req.session.userId) {
    return next();
  }
  try {
    req.user = await User.findById(req.session.userId);
    req.isAuth = true;
    req.isAdmin = req.user?.role === "admin";
    next();
  } catch (err) {
    console.error(err);
  }
};

module.exports = sessionMiddleware;
