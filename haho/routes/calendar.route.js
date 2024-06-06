const express = require("express");
const calendar = require("../controllers/calendar.controller.js");

const router = express.Router();

router.post("/create", calendar.createCalendar);
router.post("/find", calendar.findCalendar);
router.post("/update", calendar.updateCalendar);
router.post("/delete", calendar.deleteCalendar);

module.exports = router;