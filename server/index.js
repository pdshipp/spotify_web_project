const express = require("express");
const cors = require("cors");
const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const keys = require("../config");
const chalk = require("chalk");

let user = {};

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

// Spotify Strategy

passport.use(
  new SpotifyStrategy(
    {
      clientID: keys.SPOTIFY.clientID,
      clientSecret: keys.SPOTIFY.clientSecret,
      callbackURL: "http://localhost:8888/auth/spotify/callback",
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(chalk.blue(JSON.stringify(profile)));
      user = { ...profile };
      return cb(null, profile);
    }
  )
);

const app = express();
app.use(cors());
app.use(passport.initialize());

app.get(
  "auth/spotify",
  passport.authenticate("spotify", {
    scope: ["user-read-email", "user-read-private"],
  })
);
app.get(
  "http://localhost:8888/auth/spotify/callback",
  passport.authenticate("spotify", (req, res) => {
    res.redirect("/profile");
  })
);

app.get("/user", (req, res) => {
  console.log("Getting user data...");
});

app.get("/auth/logout", (req, res) => {
  console.log("Logging out...");
  user = {};
  res.redirect("/");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);
