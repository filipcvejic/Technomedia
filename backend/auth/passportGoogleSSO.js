const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/v1/auth/google/callback",
      passReqToCallback: true,
    },
    async (req, _accessToken, _refreshToken, profile, done) => {
      const password = await bcrypt.genSalt(10);

      const surname = profile.name.familyName;
      const email = profile.emails[0].value;

      const condition = { email };
      const doc = {
        name: profile.name.givenName,
        surname: surname ? surname : "",
        email: profile.emails[0].value,
        password,
        verified: profile.emails[0].verified,
      };

      try {
        const user = await User.findOrCreate(condition, doc);
        return done(null, user);
      } catch (err) {
        console.log("Error siggning up", err);
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("Serializing user:", user);
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id).catch((err) => {
    console.log("Error deserializing", err);
  });
  console.log("Deserialized user:", user);
  if (user) done(null, user);
});
