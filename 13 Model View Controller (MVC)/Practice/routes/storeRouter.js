const express = require("express");
const storeRouter = express.Router();
const { getHomes, getBookings, getIndex,getFavouriteList } = require("../controller/storeController");

storeRouter.get("/", getIndex);
storeRouter.get("/homes", getHomes);
storeRouter.get("/bookings", getBookings);
storeRouter.get("/favourite", getFavouriteList);

module.exports = storeRouter;
