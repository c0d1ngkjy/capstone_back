const express = require("express");
const user = require("../controllers/user.controller.js");

const router = express.Router();

router.post("/findUser", user.findUser); // club으로 이동
router.post("/addMember", user.addMember); 
router.post("/updateUser", user.updateUser);
router.post("/deleteUser", user.deleteUser);
router.post("/upload", user.uploadImage);

module.exports = router;