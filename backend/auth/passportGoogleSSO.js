const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const bcrypt = require("bcryptjs");
const WishList = require("../models/wishListModel");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        "https://technomedia-5gpn.onrender.com/api/v1/auth/google/callback",
      passReqToCallback: true,
    },
    async (req, _accessToken, _refreshToken, profile, done) => {
      const password = await bcrypt.genSalt(10);

      const surname = profile.name.familyName;
      const email = profile.emails[0].value;

      try {
        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            name: profile.name.givenName,
            surname: surname || "",
            email: profile.emails[0].value,
            password,
            verified: profile.emails[0].verified,
          });

          const cart = await Cart.create({ user: user._id, products: [] });
          const wishList = await WishList.create({
            user: user._id,
            products: [],
          });

          user.cart = cart._id;
          user.wishList = wishList._id;
          await user.save();
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  if (user) done(null, user);
});
