const express = require('express');
const homeRouter = express.Router();
const path = require('path');
const rootDir = require('../utils/pathUtils')


homeRouter.get("/", (req, res) => {
  console.log("Handling / for GET", req.url, req.method);
  res.sendFile(path.join(rootDir, "views/home.html"));
});

module.exports = homeRouter;