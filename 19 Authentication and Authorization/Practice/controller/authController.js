const Home = require("../models/home");
const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("auth/login", {
      title: "Login",
      activePage: "login",
      registeredHomes,
      isLoggedIn: false,
      errorMessages: [],
      oldInput: { email: "" },
      user: {},
    });
  });
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).render("auth/login", {
      title: "Login",
      activePage: "login",
      isLoggedIn: false,
      errorMessages: ["User not found."],
      oldInput: { email, password },
      user: {},
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(422).render("auth/login", {
      title: "Login",
      activePage: "login",
      isLoggedIn: false,
      errorMessages: ["Invalid Password."],
      oldInput: { email },
      user: {},
    });
  }
  req.session.isLoggedIn = true;
  req.session.user = user;
  await req.session.save();
  console.log(req.body);
  res.redirect("/");
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/login");
  });
};

exports.getSignUp = (req, res, next) => {
  res.render("auth/signup", {
    title: "Sign Up",
    activePage: "signup",
    isLoggedIn: false,
    errorMessages: [],
    oldInput: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      userType: "",
    },
    user: {},
  });
};

exports.postSignUp = [
  // first name validation
  check("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters long")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("First name must contain only letters"),

  // last name validation
  check("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters long")
    .matches(/^[A-Za-z]+$/)
    .withMessage("Last name must contain only letters"),

  // email validation
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail()
    .custom((value, { req }) => {
      // check if email already exists in the database
      return User.findOne({ email: value }).then((userDoc) => {
        if (userDoc) {
          return Promise.reject("E-Mail address already exists!");
        }
      });
    }),

  // password validation
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[!@#$%^&*]/)
    .withMessage("Password must contain at least one special character")
    .trim(),

  // confirm password validation
  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  // UserType validation
  check("userType")
    .notEmpty()
    .withMessage("User type is required")
    .isIn(["guest", "host"])
    .withMessage("Invalid user type"),

  // terms and conditions validation
  check("terms")
    .notEmpty()
    .withMessage("You must accept the terms and conditions")
    .custom((value) => {
      if (value !== "on") {
        throw new Error("You must accept the terms and conditions");
      }
      return true;
    }),

  (req, res, next) => {
    const { firstName, lastName, email, password, userType } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup", {
        title: "Sign Up",
        activePage: "signup",
        isLoggedIn: false,
        errorMessages: errors.array().map((err) => err.msg),
        oldInput: {
          firstName,
          lastName,
          email,
          password,
          userType,
        },
      });
    }

    bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        const user = new User({
          firstname: firstName,
          lastname: lastName,
          email,
          password: hashedPassword,
          userType,
        });
        return user.save();
      })
      .then(() => {
        console.log("User Created with hashed password");
        res.redirect("/login");
      })
      .catch((err) => {
        console.log("Error while saving user : ", err);
        // res.redirect("/signup");
        return res.status(422).render("auth/signup", {
          title: "Sign Up",
          activePage: "signup",
          isLoggedIn: false,
          errorMessages: [err.message],
          oldInput: {
            firstName,
            lastName,
            email,
            password,
            userType,
          },
          user: {},
        });
      });
  },
];
