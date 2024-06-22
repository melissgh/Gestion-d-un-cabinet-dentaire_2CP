var FicheDB = require('../modele/modele');
const Consultation = require('../modele/consultation');
var Rdv = require('../modele/rdv');
const Dossier = require('../modele/dossier.js');
exports.ajouter_rdv = (req, res) => {
    const { nom, prenom, heure, motif } = req.body;
    console.log(nom)
    if (!req.body) {
        res.status(400).send({ message: "le contenu ne peut pas etre vide!" });
        return;
    }
    //nouveau rdv
    const rendezvous = new Rdv({
        nom: nom,
        prenom: prenom,
        heure: heure,
        motif: motif
    })

    //sauvegarder le rdv dans la BD
    rendezvous
        .save(rendezvous)
        .then(data => {
            //res.send(data)
            res.redirect('/index-rdv');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });

}


//ajouter et sauvegarder une nouvelle fiche
exports.ajouter_fiche = (req, res) => {
    const { nom, prenom, email, date_naissance, lieu_naissance, sexe, profession, telephone } = req.body;
    //valider la requete
    if (!req.body) {
        res.status(400).send({ message: "le contenu ne peut pas etre vide!" });
        return;
    }
    //nouvelle fiche
    const fiche = new FicheDB({
        nom: nom,
        prenom: prenom,
        date_naissance: date_naissance,
        lieu_naissance: lieu_naissance,
        sexe: sexe,
        profession: profession,
        email: email,
        telephone: telephone
    });
    // creation d'une fiche 
    const dossier = new Dossier({
        nom: nom,
        prenom: prenom
    });
    // save user in the database
    dossier
        .save(dossier)
        .then(data => {
            //res.send(data)
            // res.redirect('/index-dossier');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });
    //sauvegarder la fiche dans la BD
    fiche
        .save(fiche)
        .then(data => {
            // res.send(data)
            res.redirect('/index-fiche');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Quelques erreurs sont occurèes pendant la creation de la fiche"
            });
        });

}

//retourner toutes les fiches
exports.retourner = (req, res) => {

    FicheDB.find()
        .then(fiche => {
            res.send(fiche)
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Erreurs" })
        })


}

exports.rechercher_fiche = async (req, res) => {
    try {
        const recherche = req.body.recherche;

        if (!recherche) {
            return res.status(400).send({ message: "Vous devez fournir une chaîne de caractères de recherche pour effectuer la recherche" });
        }

        const regex = new RegExp(recherche, "i"); // Recherche insensible à la casse

        const fiches = await FicheDB.find({ $or: [{ nom: regex }, { prenom: regex }] }, null, { sort: { nom: 1 } }).exec();

        if (fiches.length === 0) {
            return res.status(404).send({ message: "Aucune fiche trouvée pour la chaîne de caractères de recherche spécifiée" });
        }
        //global.fiche = fiches;
        res.render('rechercher_fiche', { fiche: fiches });
        // res.send(fiches)
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Une erreur s'est produite lors de la recherche des fiches avec la chaîne de caractères de recherche spécifiée" });
    }
}





// modifier une fiche par son id
exports.modifier_fiche = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "les donnees a modifier ne peuvent pas etre vides" })
    }

    const id_fiche = req.params.id;
    FicheDB.findByIdAndUpdate(id_fiche, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `la modification ne peut pas etre effectuee avec ${id_fiche}.Peut etre la fiche est introuvable` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Erreur lors de la modification de la fiche" })
        })
}

// supprimer une nouvelle fiche en specifiant l'id
exports.supprimer_fiche = (req, res) => {
    const id_fiche = req.params.id;
    FicheDB.findByIdAndDelete(id_fiche)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `la suppression ne peut etre effectue avec cet id ${id_fiche}.Peut etre l'id est faux.` })
            } else {
                res.send({
                    message: "La fiche a ete supprimee avec succees"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "La suppression ne peut pas etre effectuee avec cet id=" + id_fiche
            });
        });

}