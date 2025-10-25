const path = require("path");
const rootDir = require("../utils/pathUtils");
const Home = require("../models/home");
const Favourite = require("../models/favourite");
const { error } = require("console");

exports.getHomes = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) => {
    res.render("store/home-list", { registeredHomes: registeredHomes });
  });
};

exports.getIndex = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) => {
    res.render("store/index", { registeredHomes: registeredHomes });
  });
};

exports.getBookings = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) => {
    res.render("store/bookings", { bookings: registeredHomes });
  });
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourites().then((favourites) => {
    favourites = favourites.map((fav) => fav.houseId);
    Home.fetchAll().then((registeredHomes) => {
      console.log(favourites, registeredHomes);
      const favouriteHomes = registeredHomes.filter((home) =>
        favourites.includes(home._id.toString())
      );
      res.render("store/favourite-list", { favouriteHomes: favouriteHomes });
    });
  });
};
exports.postAddtoFav = (req, res, next) => {
  const homeId = req.body.id;
  const fav = new Favourite(homeId);
  fav
    .save()
    .then((result) => {
      console.log("Fav Added", result);
    })
    .catch((err) => {
      console.log("Error while Adding Favourite", err);
    })
    .finally(() => {
      return res.redirect("/favourites");
    });
};

exports.postDeleteFav = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId)
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
