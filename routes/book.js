const express = require("express");
const bookController = require("../controllers/bookController");
const isAuthMiddleware = require("../middleware/isAuthMiddleware");
const isAdminMiddleware = require("../middleware/isAdminMiddleware");
const bookRouter = express.Router();

bookRouter.get("/book/:isbn", bookController.getBook);
bookRouter.post("/book-delete/:isbn", isAuthMiddleware, isAdminMiddleware, bookController.deleteBook);
bookRouter.get("/edit-book/:isbn", isAuthMiddleware, isAdminMiddleware, bookController.getEditBook);
bookRouter.post("/edit-book/:isbn", isAuthMiddleware, isAdminMiddleware, bookController.postEditBook);
bookRouter.get("/add-book", isAuthMiddleware, isAdminMiddleware, bookController.getAddBook);
bookRouter.post("/add-book", isAuthMiddleware, isAdminMiddleware, bookController.postAddBook);

bookRouter.get("/catalog", bookController.getCatalog);
bookRouter.post("/catalog", bookController.postCatalog);


module.exports = bookRouter;
