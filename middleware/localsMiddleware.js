const localsMiddleware = (req, res, next) => {
  res.locals.isAuth = req.session.isAuth;
  res.locals.user = req.user;
  res.locals.footer = "basic";
  res.locals.errorMessage = req.flash('errorMessage')?.[0];
  next();
};

module.exports = localsMiddleware;
