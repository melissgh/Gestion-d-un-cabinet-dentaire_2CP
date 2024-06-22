const express = require('express');
const route = express.Router();
const passport = require('passport');
const changeIdController = require('../controlleur/changeId');
const services = require('../services/render');
const controller = require('../controlleur/controlleur');
const dossierController = require('../controlleur/dossier');

route.get("/dossier", dossierController.retourner);
route.delete('/dossier/:id', dossierController.supprimer_dossier);
route.post('/rechercher-dossier', dossierController.rechercher_dossier);



/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/index-fiche', services.homeRoutes);

/**
 *  @description Root dossier
 *  @method GET /
 */
route.get('/index-dossier', services.homeDossier);

/**
 *  @description Root dossier
 *  @method GET /
 */
route.get('/index-consultation', services.homeConsultation);

/**
 *  @description Root utilisateur
 *  @method GET /
 */
route.get('/Gestioncompte', services.homeUtilisateur);

/**
 *  @description ajouter fiche
 *  @method GET /ajouter-fiche
 */
route.get('/mail', services.changer_email);
route.post('/users/:id/email', changeIdController.changeEmail);

route.get('/mdp', services.changer_password);
route.post('/users/:id/password', changeIdController.changemdp);
/**
 *  @description ajouter fiche
 *  @method GET /ajouter-fiche
 */
route.get('/ajouter-fiche', services.ajouter_fiche);

route.get('/index-rdv', services.ajouter_rdv);

/**
 *  @description ajouter user
 *  @method GET /ajouter-ass
 */
route.get('/ajouter-ass', services.ajouter_utilisateur);

/**
 *  @description ajouter user
 *  @method GET /ajouter-ass
 */
route.get('/ajouter-consultation', services.ajouter_consultation);

/**
 *  @description ajouter user
 *  @method GET /ajouter-ass
 */
route.get('/ajouter-ordonance', services.ajouter_ordonnance);

/**
 *  @description ajouter user
 *  @method GET /ajouter-ass
 */
route.get('/ajouter-certificat', services.ajouter_certificat);

/**
 *  @description ajouter user
 *  @method GET /ajouter-ass
 */
route.get('/voir-consultation', services.voir_consultation);


/**
 *  @description modifier patient
 *  @method GET /modifier-fiche
 */
route.get('/modifier-fiche', services.modifier_fiche);


/**
 *  @description rechercher patient
 *  @method GET /rechercher-fiche
 */
// route.get('/rechercher-fiche', services.rechercher_fiche);

//API
route.post('/api/fiches_medicales', controller.ajouter_fiche);
route.get('/api/fiches_medicales', controller.retourner);
route.post('/rechercher-fiche', controller.rechercher_fiche);
route.put('/api/fiches_medicales/:id', controller.modifier_fiche);
route.delete('/api/fiches_medicales/:id', controller.supprimer_fiche);

route.post('/api/rendez_vous', controller.ajouter_rdv);

module.exports = route
