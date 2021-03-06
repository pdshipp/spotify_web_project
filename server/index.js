const express = require("express");
const cors = require("cors");
const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const keys = require("../config");
const chalk = require("chalk");

const app = express();
app.use(cors());
app.use(passport.initialize());

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
      callbackURL: "http://localhost:5000/auth/spotify/callback",
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(chalk.blue(JSON.stringify(profile)));
      console.log(accessToken);
      user = { ...profile };
      return cb(null, profile, accessToken);
    }
  )
);

app.get(
  "auth/spotify",
  passport.authenticate("spotify", {
    scope: ["user-read-email", "user-read-private"],
    showDialog: true,
  })
);
app.get("/auth/spotify", passport.authenticate("spotify"));

app.get(
  "/auth/spotify/callback",
  passport.authenticate("spotify"),
  (req, res) => {
    res.redirect("http://localhost:3000");
  }
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
