const express = require('express');
const application = require('../controllers/application.controller.js');

const router = express.Router();

router.post("/addApplication", application.addApplication); //create하기
router.post("/get", application.getApplication); 
router.post("/delete", application.deleteApplication);
router.post("/getlink", application.getApplicationFromLink);

module.exports = router;