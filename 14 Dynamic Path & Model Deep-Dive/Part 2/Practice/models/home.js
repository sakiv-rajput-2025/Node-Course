const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtils");
const { error } = require("console");
const homeDataPath = path.join(rootDir, "data/homes.json");
const Favourite = require("../models/favourite");

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
      if(this.id) { // edit home case
        registeredHomes = registeredHomes.map(home => home.id === this.id ? this : home )
      } else { // add home case
        this.id = Math.random().toString()
  
        registeredHomes.push(this);
      }
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
  
  static deleteById(homeId, callback) {
    this.fetchAll(homes => {
      homes = homes.filter(home => home.id !== homeId )
      fs.writeFile(homeDataPath, JSON.stringify(homes), error => {
        Favourite.deleteById(homeId,callback)
      });
    })
  }
};
