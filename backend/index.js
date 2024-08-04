const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const googleRoutes = require("./routes/googleRoutes");
const cors = require("cors");
const passport = require("passport");
require("./auth/passportGoogleSSO");
require("./models/userModel");

const port = process.env.PORT || 5000;

connectDB();

const app = express();

const corsOptions = {
  origin: "https://technomedia-five.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  next();
});

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

app.use(passport.initialize());

app.use("/api", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/v1", googleRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
