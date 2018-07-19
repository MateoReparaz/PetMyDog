const express = require("express");
const passport = require("passport");
const authRoutes = express.Router();
const User = require("../models/User");
const Dog = require("../models/Dog");
const Comment = require("../models/Comment");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

//USER LOGIN

authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login", { message: req.flash("error") });
});

authRoutes.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    badRequestMessage: "la cagaste",
    failureFlash: true,
    passReqToCallback: true
  })
);

//USER SIGNUP

authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  if (username === "" || password === "" || email === "") {
    res.render("auth/signup", {
      message: "Indicate username, password and email"
    });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      email
    });

    newUser.save(err => {
      if (err) {
        res.render("auth/signup", { message: "Something went wrong" });
      } else {
        res.redirect("/");
      }
    });
  });
});

//LOGOUT

authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

authRoutes.get("/main", (req, res, next) => {
  Dog.find().then(dogs => {
    res.render("main/main", { dogs: JSON.stringify(dogs) });
  });
});

module.exports = authRoutes;
