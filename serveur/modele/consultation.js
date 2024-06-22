const mongoose = require('mongoose')

const consultationSchema = mongoose.Schema(
    {
        nom: {
            type: String
        },
        prenom: {
            type: String
        },
        motif: {
            type: String,
        },
        traitement: {
            type: String
        },
        note: {
            type: String,
        },
        date: {
            type: String,
        }
    }

)

module.exports = mongoose.model("Consultation", consultationSchema);