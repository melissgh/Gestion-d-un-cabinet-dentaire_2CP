const express = require('express');
const router = express.Router();

const deleteController = require('../controlleur/DeleteAccount');
// Route de suppression => DELETE
router.delete('/delete/:id', deleteController.deleteAccount);

module.exports = router;