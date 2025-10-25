const path = require("path");
const rootDir = require("../utils/pathUtils");
const Home = require("../models/home");

exports.getHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("store/home-list", { registeredHomes: registeredHomes })
  );
};

exports.getIndex = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("store/index", { registeredHomes: registeredHomes })
  );
};

exports.getBookings = (req, res, next) => {
  const bookings = [
    {
      location: "Lakeview",
      photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzOd1yo5c5SJ-OFxC1hsASgv2XIXzi8XVeNw&s",
      rating: 4.5,
      price: 120,
      houseName: "Cozy Cottage"
    },
    {
      location: "Downtown",
      photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbt9h6S5jv6VA7ULYlht1uzk4PX5b8J-GjRA&s",
      rating: 4.8,
      price: 200,
      houseName: "Modern Apartment"
    }
  ];
  res.render("store/bookings", { bookings });
};

exports.getFavouriteList = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("store/favourite-list", { registeredHomes: registeredHomes })
  );
};