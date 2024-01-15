const Book = require("../models/book");

const getHome = async (req, res, next) => {
  const randomBooks = await Book.aggregate([{ $sample: { size: 6 } }]);
  res.render("home", { pageTitle: "Home", page: "/", books: randomBooks });
};

module.exports = {
  getHome,
};
