const express = require("express");
const calendar = require("../controllers/calendar.controller.js");

const router = express.Router();

router.post("/create", calendar.createDate);

module.exports = router;