const bcrypt = require("bcryptjs");
const User = require("../models/user");

const getLogin = (req, res, next) => {
  res.render("auth/login", { pageTitle: "Login", footer: "simple" });
};

const postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const doMatch = await bcrypt.compare(password, user.password);
      if (doMatch) {
        req.session.isAuth = true;
        req.session.userId = user._id;
        return req.session.save((err) => {
          if (err) {
            console.error(err);
          } else {
            res.redirect("/");
          }
        });
      }
    }
    req.flash("errorMessage", "Invalid email or password.");
    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.redirect("/login");
  }
};

const getRegister = (req, res, next) => {
  res.render("auth/register", { pageTitle: "Register", footer: "simple" });
};

const postRegister = async (req, res, next) => {
  const { email, password, fullName } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      req.flash("errorMessage", "E-Mail exists already, please pick a different one.");
      return res.redirect("/register");
    } else {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({
        email,
        password: hashedPassword,
        fullName,
      });
      await user.save();
      res.redirect("/login");
    }
  } catch (err) {
    console.error(err);
  }
};

const getLogout = (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
    } else {
      res.redirect('/');
    }
  });
};

module.exports = {
  getLogin,
  postLogin,
  getRegister,
  postRegister,
  getLogout,
};
