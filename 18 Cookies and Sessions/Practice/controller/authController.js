const Home = require("../models/home");

exports.getLogin = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("auth/login", {
      title: "Login",
      activePage: "login",
      registeredHomes,
      isLoggedIn: false
    });
  });
};

exports.postLogin = (req, res, next) => {
  console.log(req.body);
  req.session.isLoggedIn = true;
  // req.isLoggedIn = true;
  res.redirect("/");
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/login");
  });
};
