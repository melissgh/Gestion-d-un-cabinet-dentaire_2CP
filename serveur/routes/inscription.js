const express = require('express');
const router = express.Router();

const signUpController = require('../controlleur/SignUp');
// router Inscription => Post
router.post('/signUp', signUpController.Inscription);

module.exports = router;












