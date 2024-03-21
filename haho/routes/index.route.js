const express = require("express");
const index = require("../controllers/index.controller.js");

const router = express.Router();

router.get("/", index.render);

module.exports = router;