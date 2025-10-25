const express = require("express");
const userRouter = express.Router();
const path = require("path");
const rootDir = require("../utils/pathUtils");

userRouter.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views/home.html"));
});

module.exports = userRouter;
