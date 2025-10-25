const { getDB } = require("../utils/database");
const { ObjectId } = require("mongodb");

module.exports = class Home {
  constructor(location, photoUrl, rating, price, houseName, description, _id) {
    this.houseName = houseName;
    this.location = location;
    this.price = price;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    if (_id) {
      this._id = _id;
    }
  }

  save() {
    const db = getDB();
    if (this._id) {
      // Update
      const updateField = {
        houseName: this.houseName,
        location: this.location,
        price: this.price,
        rating: this.rating,
        photoUrl: this.photoUrl,
        description: this.description,
      };
      return db
        .collection("homes")
        .updateOne(
          { _id: new ObjectId(String(this._id)) },
          { $set: updateField }
        );
    } else {
      // Insert
      return db.collection("homes").insertOne(this);
    }
  }

  static fetchAll() {
    const db = getDB();
    return db.collection("homes").find().toArray();
  }

  static findById(homeId) {
    const db = getDB();
    return db
      .collection("homes")
      .find({ _id: new ObjectId(String(homeId)) })
      .next();
  }

  static deleteById(homeId) {
    const db = getDB();
    return db
      .collection("homes")
      .deleteOne({ _id: new ObjectId(String(homeId)) });
  }
};
