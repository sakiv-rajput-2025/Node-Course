const express = require("express");
const storeRouter = express.Router();
const {
  getHomes,
  getBookings,
  getIndex,
  getFavouriteList,
  getHomeDetails,
  postAddtoFav,
  postDeleteFav,
} = require("../controller/storeController");

storeRouter.get("/", getIndex);
storeRouter.get("/homes", getHomes);
storeRouter.get("/bookings", getBookings);
storeRouter.get("/favourites", getFavouriteList);

storeRouter.get("/homes/:homeId", getHomeDetails);
storeRouter.post("/favourites", postAddtoFav);
storeRouter.post("/favourites/delete/:homeId", postDeleteFav);

module.exports = storeRouter;
