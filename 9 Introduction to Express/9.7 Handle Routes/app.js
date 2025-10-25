// Core Module
const http = require("http");

// External Module
const express = require("express");

// Local Module
const requestHandler = require("./user");

const app = express();

app.use("/", (req, res, next) => {
  console.log("Middleware 1", req.url, req.method);
  // res.send("<h1>Welcome to Express.js from MiddleWare 1</h1>");
  next();
});
app.use("/", (req, res, next) => {
  console.log("Another", req.url, req.method);
  res.send("<h1>Welcome to Express.js from Another</h1>");
});
app.use("/submit-details", (req, res, next) => {
  console.log("Middleware 2", req.url, req.method);
  res.send("<p>Welcome to Express.js</p>");
});

const server = http.createServer(app);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
