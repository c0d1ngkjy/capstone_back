const express = require('express');
const application = require('../controllers/application.controller.js');

const router = express.Router();

router.post("/addApplication", application.addApplication);

module.exports = router;