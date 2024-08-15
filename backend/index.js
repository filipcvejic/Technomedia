const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const googleRoutes = require("./routes/googleRoutes");
const refreshRoute = require("./routes/refreshRoute");
const cors = require("cors");
const passport = require("passport");
require("./auth/passportGoogleSSO");
require("./models/userModel");

const port = process.env.PORT || 5000;

connectDB();

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_API_BASE_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

app.use(passport.initialize());

app.use("/", refreshRoute);
app.use("/api", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/v1", googleRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
