const express = require("express");
const bookController = require("../controllers/bookController");
const isAuthMiddleware = require("../middleware/isAuthMiddleware");
const isAdminMiddleware = require("../middleware/isAdminMiddleware");
const bookRouter = express.Router();

bookRouter.get("/book/:isbn", bookController.getBook);
bookRouter.get("/add-book", isAuthMiddleware, isAdminMiddleware, bookController.getAddBook);
bookRouter.post("/add-book", isAuthMiddleware, isAdminMiddleware, bookController.postAddBook);

bookRouter.get("/catalog", bookController.getCatalog);
bookRouter.post("/catalog", bookController.postCatalog);


module.exports = bookRouter;
