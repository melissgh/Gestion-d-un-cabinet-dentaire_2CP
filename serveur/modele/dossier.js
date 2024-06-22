const mongoose = require('mongoose')

const dossierSchema = mongoose.Schema(
    {
        nom: {
            type: String,
            required: true
        },
        prenom: {
            type: String
        }
    }
)

module.exports = mongoose.model("Dossier", dossierSchema);