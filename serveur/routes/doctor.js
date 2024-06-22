const express = require('express');
const router = express.Router();

const doctorController = require('../controlleur/doctorAccount');
router.post('/addDoctor', doctorController.addDoctorAccount);

module.exports = router;