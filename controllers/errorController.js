
const get404 = (req, res, next) => {
  res.render("errors/404", { pageTitle: "Page Not Found", page: "/404"});
};

const get500 = (err, req, res, next) => {
  res.render("errors/500", { pageTitle: "500 Error", page: "/500"});
};

module.exports = {
  get404,
  get500,
}