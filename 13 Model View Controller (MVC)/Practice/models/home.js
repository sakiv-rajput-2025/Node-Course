const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtils");
const { error } = require("console");

module.exports = class Home {
  constructor(location, photoUrl, rating, price, houseName) {
    this.houseName = houseName;
    this.location = location;
    this.price = price;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  save() {
    Home.fetchAll((registeredHomes) => {
      registeredHomes.push(this);
      const homeDataPath = path.join(rootDir, "data/homes.json");
      fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (error) => {
        console.log("File Writing Concluded", error);
      });
    });
  }

  static fetchAll(callback) {
    const homeDataPath = path.join(rootDir, "data/homes.json");
    fs.readFile(homeDataPath, (error, data) => {
      console.log("File Read", error, data);
      callback(!error ? JSON.parse(data) : []);
    });
  }
};
