const express = require('express');
const router = express.Router();
const passport = require('passport');

const changeIdController = require('../controlleur/changeId');
// Route pour changer l'email
router.put('/users/:id/email', passport.authenticate('jwt', { session: false }), changeIdController.changeEmail);


// Route pour changer le mdp
router.put('/users/:id/password', passport.authenticate('jwt', { session: false }), changeIdController.changemdp);


module.exports = router;