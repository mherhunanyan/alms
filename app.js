const path = require("path");
const mongoose = require("mongoose");
const Config = require("./config");
const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const session = require("express-session");
const bodyParser = require("body-parser");
const MongoDBStore = require("connect-mongodb-session")(session);
const mainRouter = require("./routes/main");
const authRouter = require("./routes/auth");
const sessionMiddleware = require("./middleware/sessionMiddleware");
const localsMiddleware = require("./middleware/localsMiddleware");
const flash = require('connect-flash');

// create express app
const app = express();

// view engine config
app.set("view engine", "ejs");
app.use(ejsLayouts);
app.set("layout", "layouts/main");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// session config
const sessionsStore = new MongoDBStore({
  uri: Config.mongodbUrl,
  collection: "sessions",
});
app.use(
  session({
    secret: Config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: sessionsStore,
  })
);

// use middlewares
app.use(flash());
app.use(sessionMiddleware);
app.use(localsMiddleware);

// use routes
app.use(mainRouter);
app.use(authRouter);

app.get("/catalog", (req, res) => {
  res.render("books/index", { pageTitle: "Catalog" });
});

app.use((req, res, next) => {
  res.render("errors/404", { pageTitle: "Page Not Found" });
});

// init app
const init = async () => {
  try {
    await mongoose.connect(Config.mongodbUrl);
    console.error("MongoDB Connected!");
  } catch (err) {
    console.error("Failed to connect DB");
    throw err;
  }

  app.listen(Config.port, () => {
    console.log(`ALMS app listening on port ${Config.port}`);
  });
};

init();
