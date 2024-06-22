const express = require('express');
const router = express.Router();

const forgetpasswordController = require('../controlleur/forgetpassword');
const resetpasswordController = require('../controlleur/forgetpassword');

router.post('/forgot-password', forgetpasswordController.PasswordForget);
router.post('/reset-password', resetpasswordController.PasswordReset);

module.exports = router;