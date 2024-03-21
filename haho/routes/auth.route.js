const express = require('express');
const auth = require("../controllers/auth.controller.js");

const router = express.Router();

router.get("/login", auth.login);
router.get("/logout", auth.logout);
router.get("/signup", auth.signup);

module.exports = router;