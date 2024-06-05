const express = require('express');
const club = require('../controllers/club.controller.js');

const router = express.Router();

router.post("/register", club.register);
router.get("/findAll", club.findAll);
router.post("/addAdmin", club.addAdmin);
router.post("/upload", club.uploadImageClub);
router.post("/findAdmin", club.findAdmin);

module.exports = router;