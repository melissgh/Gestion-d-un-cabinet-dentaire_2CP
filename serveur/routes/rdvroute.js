const express = require('express');

const router = express.Router();

const rdvController = require('../controlleur/rdvController');

const Appointment = require('../modele/RdvModel');



// Route pour créer un nouveau rendez-vous

router.post('/', rdvController.creerRendezVous);



// Route pour supprimer un rendez-vous existant

router.delete('/:id', rdvController.annulerRendezVous);



module.exports = router;



