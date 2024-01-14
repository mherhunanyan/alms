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
const bookRouter = require("./routes/book");
const errorController = require("./controllers/errorController");
const sessionMiddleware = require("./middleware/sessionMiddleware");
const localsMiddleware = require("./middleware/localsMiddleware");
const flash = require("connect-flash");

const app = express();

app.set("view engine", "ejs");
app.use(ejsLayouts);
app.set("layout", "main");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

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

app.use(flash());
app.use(sessionMiddleware);
app.use(localsMiddleware);

app.use(mainRouter);
app.use(authRouter);
app.use(bookRouter);

app.use(errorController.get404);
app.use(errorController.get500);

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
