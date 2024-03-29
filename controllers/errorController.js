
const get404 = (req, res, next) => {
  res.render("errors/404", { pageTitle: "Page Not Found" });
};

const get500 = (err, req, res, next) => {
  res.render("errors/500", { pageTitle: "500 Error" });
};

module.exports = {
  get404,
  get500,
}