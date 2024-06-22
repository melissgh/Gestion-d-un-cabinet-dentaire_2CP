const mongoose = require('mongoose')

const certificatSchema = mongoose.Schema(
    {
        date: {
            type: String,
            required: true
        },
        nom: {
            type: String
        },
        prenom: {
            type: String
        },
        note: {
            type: String,
            required: true
        }
    }

)

module.exports = mongoose.model("Certificat", certificatSchema);
