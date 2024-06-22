const mongoose = require('mongoose');

var fiche_patient = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    date_naissance: {
        type: String,
        required: true
    },
    lieu_naissance: {
        type: String,
        required: true
    },
    sexe: String,
    profession: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    telephone: {
        type: String
    }

})

const FicheDB = mongoose.model('fichedb', fiche_patient);

module.exports = FicheDB;