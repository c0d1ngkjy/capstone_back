const express = require('express');
const auth = require("../controllers/auth.controller.js");
const { verifyToken } = require('../middleware/jwt.middleware.js');

const router = express.Router();

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.post("/signup", auth.signup);

router.use(verifyToken);

module.exports = router;