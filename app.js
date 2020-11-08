require("dotenv").config();

const express = require("express");

const passport = require("passport");
const bodyParser = require("body-parser");
require("./controller/passportStrategy");

const app = express();

// Setting up template engine
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// Body-parser
app.use(require("body-parser").urlencoded({ extended: true }));

// Express session
app.use(
  require("express-session")({
    secret: "your secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(require("./routes/twitter"));

app.listen(3000, () => {
  console.log(`app is running at 3000`);
});
