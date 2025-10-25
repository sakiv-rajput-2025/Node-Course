const path = require("path");
exports.pageNotFound = (req, res) => {
  res.status(404).json({ message: "Page Not Found" });
};
