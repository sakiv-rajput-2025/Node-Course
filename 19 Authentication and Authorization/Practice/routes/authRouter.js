const express = require("express");
const authRouter = express.Router();
const {
  getLogin,
  postLogin,
  postLogout,
  getSignUp,
  postSignUp,
} = require("../controller/authController");

authRouter.get("/login", getLogin);
authRouter.post("/login", postLogin);
authRouter.post("/logout", postLogout);
authRouter.get("/signup", getSignUp);
authRouter.post("/signup", postSignUp);


module.exports = authRouter;
