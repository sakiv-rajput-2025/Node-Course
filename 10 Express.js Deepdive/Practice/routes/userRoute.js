const express = require("express");
const userRouter = express.Router();
const path = require("path");
const rootDir = require('../utils/pathUtils')

userRouter.get("/contact-us", (req, res) => {
  console.log("Handling / for GET", req.url, req.method);
  res.sendFile(path.join(rootDir, "views/contactUs.html"));
});

userRouter.post("/contact-us", (req, res) => {
  console.log(req.body);
  res.sendFile(path.join(rootDir, "views/done.html"));
});

module.exports = userRouter;
