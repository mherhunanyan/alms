const Book = require("../models/book");

const getBook = async (req, res, next) => {
  const isbn = req.params.isbn;
  const book = await Book.findOne({ isbn });
  if (book) {
    const relatedBooks = await Book.find({
      $or: [
        { author: book.author },
        { category: book.category }
      ],
      isbn: { $ne: isbn }
    }).limit(3);
    res.render("book/book", { book, relatedBooks, pageTitle: book.title });
  } else {
    res.render("errors/404", { pageTitle: "Page Not Found" });
  }
};

const getAddBook = (req, res, next) => {
  res.render("book/add-book", { pageTitle: "Add New Book" });
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
    res.render("book/catalog", { pageTitle: "Catalog", books });
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
    res.render("book/catalog", { pageTitle: "Catalog", books, search });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getAddBook,
  postAddBook,
  getCatalog,
  postCatalog,
  getBook,
};
