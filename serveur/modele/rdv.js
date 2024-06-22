const mongoose = require('mongoose');

var rendezvous = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    heure: {
        type: String,
        required: true
    },
    motif: {
        type: String,
        required: true
    }
}

)

const Rdv = mongoose.model('rendezVous', rendezvous);

module.exports = Rdv;