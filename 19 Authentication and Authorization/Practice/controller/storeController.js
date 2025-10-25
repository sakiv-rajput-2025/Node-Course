const Home = require("../models/home");
const User = require("../models/user");

exports.getHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getIndex = (req, res, next) => {
  console.log("Session Value :  ", req.session);
  Home.find().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getBookings = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/bookings", {
      bookings: registeredHomes,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getFavouriteList = async (req, res, next) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId).populate("favouriteHotels");
  res.render("store/favourite-list", {
    favouriteHomes: user.favouriteHotels,
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.postAddtoFav = async (req, res, next) => {
  const homeId = req.body.id;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (!user.favouriteHotels.includes(homeId)) {
    user.favouriteHotels.push(homeId);
    await user.save();
  }
  return res.redirect("/favourites");
};

exports.postDeleteFav = async (req, res, next) => {
  const homeId = req.params.homeId;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (user.favouriteHotels.includes(homeId)) {
    user.favouriteHotels = user.favouriteHotels.filter((fav) => fav != homeId);
    await user.save();
  }
  return res.redirect("/favourites");
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("At home details Page", homeId);
  Home.findById(homeId).then((home) => {
    console.log("home details Found ", home);
    if (!home) {
      console.log("Home Not Found");
      return res.redirect("/homes");
    } else {
      res.render("store/home-detail", {
        homeId: homeId,
        home: home,
        isLoggedIn: req.isLoggedIn,
        user: req.session.user,
      });
    }
  });
};
