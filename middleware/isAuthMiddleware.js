const isAuthMiddleware = (req, res, next) => {
  if (!req.isAuth) {
    return res.redirect("/login");
  }
  next();
};

module.exports = isAuthMiddleware;
