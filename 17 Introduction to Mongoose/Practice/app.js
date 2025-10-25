const express = require("express");
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const { pageNotFound } = require("./controller/errors");
const { default: mongoose } = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());
app.use(storeRouter);
app.use(hostRouter);
app.use(pageNotFound);

const PORT = 3000;

const DB_PATH =
  "mongodb+srv://demo:demo1234@demo.4em02gr.mongodb.net/airbnb?retryWrites=true&w=majority&appName=DEMO";

mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("Connected to mongoose");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to mongoose", err);
  });
