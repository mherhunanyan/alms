const Book = require("../models/book");

const getAddBook = (req, res, next) => {
  res.render("book/add-book", { pageTitle: "Add New Book", page: "/add-book" });
};

const postAddBook = async (req, res, next) => {
  const { title, author, isbn, category, availability, imageUrl } = req.body;
  try {
    const book = await Book.findOne({ isbn });
    if (book) {
      req.flash(
        "errorMessage",
        "Book exists already, please pick a different one."
      );
      return res.redirect("/add-book");
    } else {
      const book = new Book({
        title,
        author,
        isbn,
        category,
        availability: availability === "on",
        imageUrl,
      });
      await book.save();
      req.flash("successMessage", "Book Saved");
      res.redirect("/add-book");
    }
  } catch (err) {
    console.error(err);
  }
};

const getCatalog = async (req, res, next) => {
  try {
    const books = await Book.find({}).limit(100);
    res.render("book/catalog", { pageTitle: "Catalog", page: "/catalog", books });
  } catch (err) {
    console.error(err);
  }
};

const postCatalog = async (req, res, next) => {
  const { search = "" } = req.body;
  const searchTerm = search.trim();
  try {
    const query = {
      $or: [
        { author: { $regex: searchTerm, $options: "i" } },
        { title: { $regex: searchTerm, $options: "i" } },
      ],
    };

    const books = await Book.find(query).limit(100);
    res.render("book/catalog", { pageTitle: "Catalog", page: "/catalog", books, search });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getAddBook,
  postAddBook,
  getCatalog,
  postCatalog,
};
