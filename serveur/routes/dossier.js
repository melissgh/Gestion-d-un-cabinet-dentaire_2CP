const express = require('express');
const router = express.Router()

const dossierController = require('../controlleur/dossier');

router.get("/dossier", dossierController.retourner);

// router.get("/dossier", dossierController.getDossiers);
router.get("/dossier/:id", dossierController.getDossier);
router.post("/dossier", dossierController.creatDossier);

module.exports = router;