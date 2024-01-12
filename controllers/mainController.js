const getHome = (req, res, next) => {
  res.render("home", { pageTitle: "Home" });
};

module.exports = {
  getHome,
};
