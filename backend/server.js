import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.listen(port, () => console.log(`Server started on port ${port}`));
