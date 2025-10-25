const express = require("express");
const hostRouter = express.Router();
const { getAddHome, postHomeAdded,getHostHomes,getEditHome,postEditHome, postDeleteHome } = require("../controller/hostController");


hostRouter.get("/host/add-home", getAddHome);
hostRouter.post("/host/add-home", postHomeAdded);
hostRouter.get("/host/host-home-list", getHostHomes);
hostRouter.get("/host/edit-home/:homeId", getEditHome);
hostRouter.post("/host/edit-home", postEditHome);
hostRouter.post("/host/delete-home/:homeId", postDeleteHome);

module.exports = hostRouter;    