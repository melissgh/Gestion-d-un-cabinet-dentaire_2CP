const express = require('express');
const router = express.Router();

const addAccountController = require('../controlleur/AddAccount');
// Route for adding an account
router.post('/api/gestion_compte', addAccountController.addAccount);
router.get('/api/gestion_compte', addAccountController.retourner);


module.exports = router;