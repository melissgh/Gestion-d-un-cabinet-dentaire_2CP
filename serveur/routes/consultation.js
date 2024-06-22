const express = require('express');
const router = express.Router()

const consultationController = require('../controlleur/consultation');
const consultation = require('../modele/consultation');

router.get("/consultation", consultationController.retourner);
router.post('/rechercher-consultation', consultationController.rechercher_consultation);

router.get("/consultation/:id", consultationController.getConsultation);
router.post("/consultation", consultationController.createConsultation);
router.put("/consultation/:id", consultationController.updateConsultation);
router.delete("/consultation/:id", consultationController.deleteConsultation);
router.get('/consultationUser', consultationController.findByName);


module.exports = router;