const isAdminMiddleware = (req, res, next) => {
  if (!req.isAdmin) {
    res.render("errors/404", { pageTitle: "Page Not Found" });
  }
  next();
};

module.exports = isAdminMiddleware;
