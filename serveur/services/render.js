const axios = require('axios');
const { query } = require('express');
var FicheDB = require('../modele/modele');
const Consultation = require('../modele/consultation.js');
const Dossier = require('../modele/dossier.js');
var User = require('../modele/User');

exports.homeRoutes = (req, res) => {
    //faire une requete GET vers /api/fiches_medicales
    axios.get('http://localhost:3000/api/fiches_medicales')
        .then(function (response) {
            global.fiches = response.data;
            res.render('index_fiche', { fiches: response.data });
        })
        .catch(err => {
            res.send(err)
        })
}

exports.homeUtilisateur = (req, res) => {
    //faire une requete GET vers /api/gestion_compte
    axios.get('http://localhost:3000/api/gestion_compte')
        .then(function (response) {
            // console.log(response)
            res.render('Gestioncompte', { utilisateur: response.data });
        })
        .catch(err => {
            res.send(err)
        })
}

exports.homeDossier = (req, res) => {
    //faire une requete GET vers /api/gestion_compte
    axios.get('http://localhost:3000/dossier')
        .then(function (response) {
            // console.log(response)
            res.render('index_dossier', { dossier: response.data });
        })
        .catch(err => {
            res.send(err)
        })
}
exports.homeConsultation = (req, res) => {
    //faire une requete GET vers /api/gestion_compte
    axios.get('http://localhost:3000/consultation')
        .then(function (response) {
            // console.log(response)
            res.render('index_consultation', { consult: response.data });
        })
        .catch(err => {
            res.send(err)
        })
}

exports.changer_email = (req, res) => {
    res.render('mail');
}
exports.changer_password = (req, res) => {
    res.render('mdp');
}

exports.ajouter_fiche = (req, res) => {
    res.render('ajouter_fiche');
}
exports.ajouter_rdv = (req, res) => {
    res.render('index_rdv');
}
exports.ajouter_utilisateur = (req, res) => {
    res.render('ajouter-ass');
}

exports.ajouter_ordonnance = (req, res) => {
    const id = req.query.id;
    Dossier.findById(id, (err, doss) => {
        if (!err) {
            console.log(doss)
            res.render("ajouter-ordonance", { doss: doss })

        };
    })
}
exports.ajouter_consultation = (req, res) => {
    const id = req.query.id;
    console.log(id)
    Dossier.findById(id, (err, doss) => {
        if (!err) {
            console.log(doss)
            res.render("ajouter-consultation", { doss: doss })

        };
    })
}
exports.ajouter_certificat = (req, res) => {
    const id = req.query.id;
    console.log(id)
    Dossier.findById(id, (err, doss) => {
        if (!err) {
            console.log(doss)
            res.render("ajouter-certificat", { doss: doss })

        };
    })
}

exports.modifier_fiche = (req, res) => {
    const id = req.query.id;
    FicheDB.findById(id, (err, fiche) => {
        if (!err) {
            global.fiche = fiche;
            res.render("modifier_fiche", { fiche: fiche })

        };
    })
}
exports.voir_consultation = (req, res) => {
    const id = req.query.id;
    console.log(id)
    Consultation.findById(id, (err, doss) => {
        if (!err) {
            console.log(doss)
            res.render("voir_consultation", { doss: doss })

        };
    })
}


exports.rechercher_fiche = (req, res) => {
    const recherche = req.body.recherche;
    const data = { recherche: recherche };
    axios
        .post("http://localhost:3000/api/fiches_medicales/rechercher_fiche", data)
        .then((response) => {
            res.render("rechercher_fiche", { fiche: response.data });
        })
        .catch((err) => {
            res.send(err);
        });
};
