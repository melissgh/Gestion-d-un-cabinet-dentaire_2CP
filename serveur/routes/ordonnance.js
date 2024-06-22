const express = require('express');
const router = express.Router()

const ordonnanceController = require('../controlleur/ordonnance');


router.get("/ordonnance", ordonnanceController.getOrdonnances);
router.get("/ordonnance/:id", ordonnanceController.getOrdonnance);
router.post("/ordonnance", ordonnanceController.creatOrdonnance);
router.delete("/ordonnance/:id", ordonnanceController.deleteOrdonnance);
router.get("/ordonnance/imprimer/:id", ordonnanceController.imprimerOrdonnance);

module.exports = router; 