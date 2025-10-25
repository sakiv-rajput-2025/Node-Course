const mongo = require("mongodb");

const MongoClient = mongo.MongoClient;

// const MONGO_URL = "mongodb+srv://demo:demo1234@demo.4em02gr.mongodb.net/?retryWrites=true&w=majority&appName=DEMO";
const MONGO_URL =
  "mongodb+srv://demo:demo1234@demo.4em02gr.mongodb.net/?retryWrites=true&w=majority&appName=DEMO";

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL)
    .then((client) => {
      callback();
      _db = client.db("airbnb");
    })
    .catch((err) => {
      console.log("Error While connecting to mongo : ", err);
    });
};

const getDB = () => {
  if (!_db) {
    throw new Error("Mongo not connected");
  }
  return _db;
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
