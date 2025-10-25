const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const multer = require("multer");
const DB_PATH =
  "mongodb+srv://demo:demo1234@demo.4em02gr.mongodb.net/airbnb?retryWrites=true&w=majority&appName=DEMO";

const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const { pageNotFound } = require("./controller/errors");
const { default: mongoose } = require("mongoose");
const authRouter = require("./routes/authRouter");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const store = new MongoDBStore({
  uri: DB_PATH,
  collection: "sessions",
});

const randomString = (length) => {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, randomString(10) + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const multerOptions = {
  storage,
  fileFilter,
};

app.use(express.urlencoded());
app.use(multer(multerOptions).single("photo"));
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use("/host/uploads", express.static("uploads"));
app.use("/homes/uploads", express.static("uploads"));

app.use(
  session({
    secret: "my secret key",
    resave: false,
    saveUninitialized: true,
    store,
  })
);

app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  next();
});
app.use(storeRouter);
app.use(authRouter);
app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});
app.use(hostRouter);
app.use(pageNotFound);

const PORT = 3000;

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
