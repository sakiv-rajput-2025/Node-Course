const path = require("path");
const rootDir = require("../utils/pathUtils");
const Home = require("../models/home");
const { error } = require("console");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", { editing: false });
};
exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found for Edit");
      return res.redirect("/host/host-home-list");
    }
    console.log(homeId, editing, home);
    res.render("host/edit-home", { home: home, editing: editing });
  });
};

exports.postHomeAdded = (req, res, next) => {
  console.log("Home Register : ", req.body);
  const { location, photoUrl, rating, price, houseName, description } =
    req.body;
  const home = new Home(
    location,
    photoUrl,
    rating,
    price,
    houseName,
    description
  );
  home.save();
  res.redirect("/host/host-home-list");
};

exports.postEditHome = (req, res, next) => {
  console.log("Home Register : ", req.body);
  const { id, location, photoUrl, rating, price, houseName, description } =
    req.body;
  const home = new Home(
    location,
    photoUrl,
    rating,
    price,
    houseName,
    description,
    id
  );
  home.save().then((result) => {
    console.log("Home Saved Successfully", result);
  });
  res.redirect("/host/host-home-list");
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) => {
    res.render("host/host-home-list", { registeredHomes: registeredHomes });
  });
};
exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Came to Delete from id : ", homeId);
  Home.deleteById(homeId)
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.log("Error while deleting", error);
    });
};
