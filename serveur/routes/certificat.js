const express = require('express');
const router = express.Router()

const certificatController = require('../controlleur/certificat');

router.get("/certificat", certificatController.getCertificats);
router.get("/certificat/:id", certificatController.getCertificat);
router.post("/certificat", certificatController.creatCertificat);
router.delete("/certificat/:id", certificatController.deleteCertificat);
router.get("/certificat/imprimer/:id",certificatController.imprimerCertificat);

module.exports = router;

