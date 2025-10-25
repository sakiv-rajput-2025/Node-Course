const express = require("express");
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const { pageNotFound } = require("./controller/errors");
const { mongoConnect } = require("./utils/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());
app.use(storeRouter);
app.use(hostRouter);
app.use(pageNotFound);

const PORT = 3000;

mongoConnect((client) => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
