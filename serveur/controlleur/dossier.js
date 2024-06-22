const Dossier = require('../modele/dossier.js');

exports.rechercher_dossier = async (req, res) => {
    try {
        const recherche = req.body.recherche;

        if (!recherche) {
            return res.status(400).send({ message: "Vous devez fournir une chaîne de caractères de recherche pour effectuer la recherche" });
        }

        const regex = new RegExp(recherche, "i"); // Recherche insensible à la casse

        const dossiers = await Dossier.find({ $or: [{ nom: regex }, { prenom: regex }] }, null, { sort: { nom: 1 } }).exec();

        if (dossiers.length === 0) {
            return res.status(404).send({ message: "Aucune fiche trouvée pour la chaîne de caractères de recherche spécifiée" });
        }
        //global.fiche = fiches;
        res.render('rechercher_dossier', { dos: dossiers });
        // res.send(fiches)
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Une erreur s'est produite lors de la recherche des fiches avec la chaîne de caractères de recherche spécifiée" });
    }
}
exports.supprimer_dossier = (req, res) => {
    const id = req.params.id;
    Dossier.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `la suppression ne peut etre effectue avec cet id ${id}.Peut etre l'id est faux.` })
            } else {
                res.send({
                    message: "La fiche a ete supprimee avec succees"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "La suppression ne peut pas etre effectuee avec cet id=" + id
            });
        });

}
exports.retourner = (req, res) => {

    Dossier.find()
        .then(dossier => {
            res.send(dossier)
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Erreurs" })
        })


}

exports.getDossiers = async (req, res) => {
    try {
        const dossiers = await Dossier.find({});
        res.status(200).json(dossiers);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

exports.getDossier = async (req, res) => {
    try {
        const { id } = req.params;
        const dossier = await Dossier.findById(id);
        res.status(200).json(dossier);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.creatDossier = async (req, res) => {
    try {
        const dossier = await Dossier.create(req.body)
        res.status(200).json(dossier);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
};