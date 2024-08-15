const express = require("express");
const { refresh } = require("../controllers/refreshController");

const router = express.Router();

router.get("/refresh", refresh);

module.exports = router;
