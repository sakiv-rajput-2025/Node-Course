const express = require("express");
const hostRouter = express.Router();
const { getAddHome, postHomeAdded,getHostHomes } = require("../controller/hostController");


hostRouter.get("/host/add-home", getAddHome);
hostRouter.post("/host/add-home", postHomeAdded);
hostRouter.get("/host/host-home-list", getHostHomes);

module.exports = hostRouter;
