const path = require("path");
const rootDir = require("../utils/pathUtils");
const Home = require("../models/home");
const Favourite = require("../models/favourite");
const { error } = require("console");

exports.getHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/home-list", { registeredHomes: registeredHomes });
  });
};

exports.getIndex = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/index", { registeredHomes: registeredHomes });
  });
};

exports.getBookings = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/bookings", { bookings: registeredHomes });
  });
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.find()
    .populate("houseId")
    .then((favourites) => {
      const favouriteHomes = favourites.map((fav) => fav.houseId);
      console.log("Favourite Homes ", favouriteHomes);
      res.render("store/favourite-list", { favouriteHomes: favouriteHomes });
    });
};

exports.postAddtoFav = (req, res, next) => {
  const homeId = req.body.id;
  Favourite.findOne({ houseId: homeId })
    .then((fav) => {
      if (fav) {
        console.log("Favourite already added");
        return res.redirect("/favourites");
      } else {
        fav = new Favourite({ houseId: homeId });
        fav.save().then((result) => {
          console.log("Fav Added", result);
        });
      }
      return res.redirect("/favourites");
    })
    .catch((err) => {
      console.log("Error while Adding Favourite", err);
    });
};

exports.postDeleteFav = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.findOneAndDelete({ houseId: homeId })
    .then((result) => {
      console.log("Fav Removed", result);
    })
    .catch((err) => {
      console.log("Error while Removing Favourite", err);
    })
    .finally(() => {
      return res.redirect("/favourites");
    });
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
      });
    }
  });
};
