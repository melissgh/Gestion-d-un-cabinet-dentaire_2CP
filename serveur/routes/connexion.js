const express = require('express');
const router = express.Router();

const LogInController = require('../controlleur/LogIn');


router.post('/login', LogInController.Connexion);

module.exports = router;