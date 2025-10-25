const path = require("path");
const rootDir = require("../utils/pathUtils");
const Home = require("../models/home");
const Favourite = require("../models/favourite");
const { error } = require("console");

exports.getHomes = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes]) => {
    res.render("store/home-list", { registeredHomes: registeredHomes });
  });
};

exports.getIndex = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes]) => {
    res.render("store/index", { registeredHomes: registeredHomes });
  });
};

exports.getBookings = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes]) => {
    res.render("store/bookings", { bookings: registeredHomes });
  });
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourites((favourites) => {
    Home.fetchAll().then(([registeredHomes]) => {
      const favouriteHomes = registeredHomes.filter((home) =>
        favourites.includes(home.id)
      );
      res.render("store/favourite-list", { favouriteHomes: favouriteHomes });
    });
  });
};
exports.postAddtoFav = (req, res, next) => {
  console.log("Came to AddtoFav", req.body);
  Favourite.addToFavourite(req.body.id, (error) => {
    if (error) {
      console.log("Error while Marking Favourite", error);
    }
    return res.redirect("/favourites");
  });
};
exports.postDeleteFav = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId, (error) => {
    if (error) {
      console.log("Error while removing from Favourite", error);
    }
    return res.redirect("/favourites");
  });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("At home details Page", homeId);
  Home.findById(homeId).then(([homes]) => {
    const home = homes[0];
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
