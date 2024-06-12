const express = require("express");
const receipt = require("../controllers/receipt.controller.js");

const router = express.Router();

router.post("/addReceipt", receipt.addReceipt); 
router.post("/getReceipt", receipt.getReceipt); 
router.post("/deleteReceipt", receipt.deleteReceipt); 

module.exports = router;