const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    editing: false,
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};
exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found for Edit");
      return res.redirect("/host/host-home-list");
    }
    console.log(homeId, editing, home);
    res.render("host/edit-home", {
      home: home,
      editing: editing,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.postAddHome = (req, res, next) => {
  console.log("Home Register : ", req.body);
  const { location, rating, price, houseName, description } = req.body;
  console.log(location, rating, price, houseName, description);
  console.log("Photo File : ", req.file);

  if (!req.file) {
    return res.status(422).send("File not found");
  }

  const photo = req.file.path;

  const home = new Home({
    location,
    photo,
    rating,
    price,
    houseName,
    description,
  });
  home.save().then(() => console.log("Home Saved Successfully"));
  res.redirect("/host/host-home-list");
};

exports.postEditHome = (req, res, next) => {
  console.log("Home Register : ", req.body);
  const { id, location, rating, price, houseName, description } = req.body;
  Home.findById(id)
    .then((home) => {
      home.location = location;
      home.rating = rating;
      home.price = price;
      home.houseName = houseName;
      home.description = description;

      if (req.file) {
        fs.unlink(home.photo, (err) => {
          if (err) {
            console.log("Error while deleting the file", err);
          } else {
            console.log("Previous file deleted successfully");
          }
        });
        home.photo = req.file.path;
      }

      home
        .save()
        .then((result) => {
          console.log("Home Saved Successfully", result);
        })
        .catch((err) => {
          console.log("Error while updating the home", err);
        });
      res.redirect("/host/host-home-list");
    })
    .catch((err) => {
      console.log("Error while fetching the home by id", err);
    });
};

exports.getHostHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};
exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Home to be deleted : ", homeId);
  Home.findByIdAndDelete(homeId)
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.log("Error while deleting", error);
    });
};
