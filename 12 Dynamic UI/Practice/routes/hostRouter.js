const express = require("express");
const hostRouter = express.Router();
const path = require("path");
const rootDir = require("../utils/pathUtils");

hostRouter.get("/host/add-home", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views/addHome.html"));
});

const registeredHomes = [];
hostRouter.post("/host/add-home", (req, res, next) => {
  console.log(req.body, req.body);
  registeredHomes.push(req.body);
  res.sendFile(path.join(rootDir, "views/homeAdded.html"));
});

exports.hostRouter = hostRouter;
exports.registeredHomes = registeredHomes
