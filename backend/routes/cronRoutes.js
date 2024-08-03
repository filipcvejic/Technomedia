const cronController = require("../controllers/cronController");

const express = require("express");

const router = express.Router();

outer.get("/api/cron", cronController);

module.exports = router;
