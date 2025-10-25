// External Module
const express = require("express");

// Local Module
const requestHandler = require("./user");

const app = express();

app.use((req, res, next) => {
  console.log("Middleware 1", req.method, req.url);
  next();
});
app.use((req, res, next) => {
  console.log("Middleware 2", req.method, req.url);
  res.send("<p>Welcome to Express.js</p>");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
