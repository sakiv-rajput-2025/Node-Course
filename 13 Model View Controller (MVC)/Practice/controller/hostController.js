const path = require("path");
const rootDir = require("../utils/pathUtils");
const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views/host/addHome.html"));
};

exports.postHomeAdded = (req, res, next) => {
  console.log("Home Register : ", req.body);
  const { location, photoUrl, rating, price, houseName } = req.body;
  const home = new Home(location, photoUrl, rating, price, houseName);
  home.save();
  res.sendFile(path.join(rootDir, "views/host/homeAdded.html"));
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("host/host-home-list", { registeredHomes: registeredHomes })
  );
};
