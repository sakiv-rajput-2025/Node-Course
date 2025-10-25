const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtils");
const { error } = require("console");
const homeDataPath = path.join(rootDir, "data/homes.json");

module.exports = class Home {
  constructor(location, photoUrl, rating, price, houseName) {
    this.houseName = houseName;
    this.location = location;
    this.price = price;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  save() {
    this.id = Math.random().toString()
    Home.fetchAll((registeredHomes) => {
      registeredHomes.push(this);
      fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (error) => {
        console.log("File Writing Concluded", error);
      });
    });
  }

  static fetchAll(callback) {
    fs.readFile(homeDataPath, (error, data) => {
      // console.log("File Read", error, data);
      callback(!error ? JSON.parse(data) : []);
    });
  }

  static findById(homeId, callback) {
    this.fetchAll(homes => {
      const homeFound = homes.find(home => home.id === homeId)
      callback(homeFound)
    })
  }
};
