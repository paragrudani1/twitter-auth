require("dotenv").config();

const express = require("express");

const passport = require("passport");
const bodyParser = require("body-parser");
require("./passportStrategy");

const app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: "your secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/login/twitter", passport.authenticate("twitter"));

app.get(
  "/oauth/callback",
  passport.authenticate("twitter", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

app.get("/profile", (req, res) => {
  res.render("profile", { user: req.user });
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
});

app.listen(3000, () => {
  console.log(`app is running at 3000`);
});
