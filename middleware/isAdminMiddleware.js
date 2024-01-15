const isAdminMiddleware = (req, res, next) => {
  if (!req.isAdmin) {
    res.render("errors/404", { pageTitle: "Page Not Found", page: "/404" });
  }
  next();
};

module.exports = isAdminMiddleware;
