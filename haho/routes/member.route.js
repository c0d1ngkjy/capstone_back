const express = require("express");
const member = require("../controllers/member.controller.js");

const router = express.Router();

router.post("/addMember", member.addMember); // member
router.post("/findMember", member.findMember); // member
router.post("/updateMember", member.updateMember); // member
router.post("/deleteMember", member.deleteMember); // member

module.exports = router;