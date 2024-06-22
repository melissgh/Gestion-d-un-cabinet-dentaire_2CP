const mongoose = require('mongoose')

const ordonnanceSchema = mongoose.Schema(
    {
        nom: {
            type: String
        },
        prenom: {
            type: String
        },
        age: {
            type: Number,
            required: true,
            default: 0
        },
        date: {
            type: String,
            required: true
        },
        adresse: {
            type: String,
            required: true
        },
        num_tel: {
            type: String,
            required: true
        },
        medicaments: {
            type: String,
            required: true
        },
        note: {
            type: String,
            required: true
        },
        num_ordre: {
            type: String,
            required: true
        }
    }

)

module.exports = mongoose.model("Ordonnance", ordonnanceSchema);