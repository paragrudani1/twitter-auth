const express = require("express");
const passport = require("passport");
const router = express.Router();


// Home Route
router.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

// Login Route
router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/login/twitter", passport.authenticate("twitter"));

router.get(
  "/oauth/callback",
  passport.authenticate("twitter", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

// Profile Route
router.get("/profile", (req, res) => {
  res.render("profile", { user: req.user });
});

// Logout Route
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
});

module.exports = router;
