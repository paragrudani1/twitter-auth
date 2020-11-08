const passport = require("passport");
const Strategy = require("passport-twitter").Strategy;

const trustProxy = false;

passport.use(
  new Strategy(
    {
      consumerKey: process.env.KEY,
      consumerSecret: process.env.SECRET,
      callbackURL: "/oauth/callback",
      proxy: trustProxy,
    },
    (token, tokenSecret, profile, cb) => {
      return cb(null, profile);
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

