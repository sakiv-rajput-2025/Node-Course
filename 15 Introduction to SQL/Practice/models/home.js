const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtils");
const { error } = require("console");
const homeDataPath = path.join(rootDir, "data/homes.json");
const Favourite = require("../models/favourite");
const db = require("../utils/database");

module.exports = class Home {
  constructor(location, photoUrl, rating, price, houseName, description, id) {
    this.houseName = houseName;
    this.location = location;
    this.price = price;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    this.id = id;
  }

  save() {
    if (this.id) {
      // Update
      return db.execute(
        "UPDATE homes SET  houseName=?, price=?, location=?, rating=?, photoUrl=?, description=? WHERE id=?",
        [
          this.houseName,
          this.price,
          this.location,
          this.rating,
          this.photoUrl,
          this.description,
          this.id,
        ]
      );
    } else {
      // Insert
      return db.execute(
        "INSERT INTO homes ( houseName, price, location, rating, photoUrl, description) VALUES (?,?,?,?,?,?)",
        [
          this.houseName,
          this.price,
          this.location,
          this.rating,
          this.photoUrl,
          this.description,
        ]
      );
    }
  }

  static fetchAll() {
    return db.execute("SELECT * FROM homes");
  }

  static findById(homeId) {
    return db.execute("SELECT * FROM homes WHERE id = ?", [homeId]);
  }

  static deleteById(homeId) {
    return db.execute("DELETE FROM homes WHERE id = ?", [homeId]);
  }
};
