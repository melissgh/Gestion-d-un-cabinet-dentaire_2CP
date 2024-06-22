const Consultation = require('../modele/consultation.js');

exports.rechercher_consultation = async (req, res) => {
    try {
        const recherche = req.body.recherche;

        if (!recherche) {
            return res.status(400).send({ message: "Vous devez fournir une chaîne de caractères de recherche pour effectuer la recherche" });
        }

        const regex = new RegExp(recherche, "i"); // Recherche insensible à la casse

        const consultations = await Consultation.find({ $or: [{ nom: regex }, { prenom: regex }] }, null, { sort: { nom: 1 } }).exec();

        if (consultations.length === 0) {
            return res.status(404).send({ message: "Aucune fiche trouvée pour la chaîne de caractères de recherche spécifiée" });
        }
        //global.fiche = fiches;
        res.render('rechercher_consultation', { cons: consultations });
        // res.send(fiches)
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Une erreur s'est produite lors de la recherche des fiches avec la chaîne de caractères de recherche spécifiée" });
    }
}

exports.retourner = (req, res) => {

    Consultation.find()
        .then(cons => {
            res.send(cons)
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Erreurs" })
        })


}
exports.getConsultations = async (req, res) => {
    try {
        const consultations = await Consultation.find({});
        res.status(200).json(consultations);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

exports.getConsultation = async (req, res) => {
    try {
        const { id } = req.params;
        const consultation = await Consultation.findById(id);
        res.status(200).json(consultation);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.createConsultation = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }

    // new user
    const consultation = new Consultation({
        nom: req.body.nom,
        prenom: req.body.prenom,
        motif: req.body.motif,
        note: req.body.note,
        traitement: req.body.traitement,
        date: req.body.date
    })

    // save user in the database
    consultation
        .save(consultation)
        .then(data => {
            //res.send(data)
            res.redirect('/index-dossier');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });

}

exports.updateConsultation = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }

    const id = req.params.id;
    Consultation.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update user with ${id}. Maybe user not found!` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update user information" })
        })
};


exports.deleteConsultation = (req, res) => {
    const id = req.params.id;

    Consultation.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
            } else {
                res.send({
                    message: "User was deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};

exports.findByName = async (req, res) => {
    const nom = req.query.nom;
    const prenom = req.query.prenom;
    try {
        let consultations;
        if (nom && prenom) {
            consultations = await Consultation.find({ nom: nom, prenom: prenom });
        } else if (nom) {
            consultations = await Consultation.find({ nom: nom });
        } else if (prenom) {
            consultations = await Consultation.find({ prenom: prenom });
        } else {
            consultations = await Consultation.find({});
        }
        // res.send(consultations);
        res.render('consultations', { cons: consultations });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur serveur');
    }
};