const Ordonnance = require('../modele/ordonnance.js');
const { or } = require('ip');
const PDFDocument = require('pdfkit');
const fs = require('fs');

exports.getEntry = (req, res) => {
    res.send('Hello NODE API')
};

exports.getOrdonnances = async (req, res) => {
    try {
        const ordonnances = await Ordonnance.find({});
        res.status(200).json(ordonnances);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

exports.getOrdonnance = async (req, res) => {
    try {
        const { id } = req.params;
        const ordonnance = await Ordonnance.findById(id);
        res.status(200).json(ordonnance);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

exports.creatOrdonnance = async (req, res) => {
    try {
        // Créer une nouvelle ordonnance
        const ordonnance = await Ordonnance.create(req.body);

        // Initialiser un nouveau document PDF
        const doc = new PDFDocument();

        // Écrire les informations de l'ordonnance dans le document PDF
        doc.text(`Docteur L.ZIZI                                                                                Aokas    le ${ordonnance.date}\n\nDENTISTE GENERALISTE                                                           Prenom:${ordonnance.prenom}\n\nCité des palmiers, Aokas, Béjaïa                                                   Nom: ${ordonnance.nom}\n\nTel: 0776 48 20 25                                                                          Age: ${ordonnance.age}\n\nNumero d'ordre: ${ordonnance.num_ordre}
      \n\n\n                                                         ORDONNANCE\n\n\n
      ${ordonnance.medicaments}                                                                                          ${ordonnance.note}`);

        // Enregistrer le document PDF dans un fichier
        const pdfFilePath = `${ordonnance.nom}_${ordonnance.prenom}.pdf`;
        doc.pipe(fs.createWriteStream(pdfFilePath));
        doc.end();

        // Envoyer le document PDF au navigateur pour qu'il s'ouvre automatiquement
        res.setHeader('Content-disposition', `inline; filename="${pdfFilePath}"`);
        res.setHeader('Content-type', 'application/pdf');
        doc.pipe(res);
        console.log('L\'ordonnance et le fichier PDF ont été créés avec succès !');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

exports.deleteOrdonnance = (req, res) => {
    const id = req.params.id;

    Ordonnance.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
            } else {
                res.send({
                    message: "deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete"
            });
        });
}

exports.imprimerOrdonnance = async (req, res) => {
    try {
        // Trouver la personne dans la base de données MongoDB
        const { id } = req.params;
        const ordonnance = await Ordonnance.findById(id);

        // Initialiser un nouveau document PDF
        const doc = new PDFDocument();

        // Écrire les informations de la personne dans le document PDF
        doc.text(`Docteur L.ZIZI                                                                                Aokas    le ${ordonnance.date}\n\nDENTISTE GENERALISTE                                                           prenom:${ordonnance.prenom}\n\n obturations, traitement radiculaire                                                 Nom: ${ordonnance.nom}\n\n_consultation dentaire, détartrage                                                  age: ${ordonnance.age}\n\nextractions, prothèses fixe et amovible, blanchiment dentaire
      \n\nCité des palmiers, Aokas, Béjaïa\n\nTel: 0776 48 20 25\n\nNumero d'ordre: ${ordonnance.num_ordre}\n\n\n                                                 ORDONNANCE\n\n\n
      ${ordonnance.medicaments}                                                                                          ${ordonnance.note}`);

        // Enregistrer le document PDF dans un fichier
        doc.pipe(fs.createWriteStream(`${ordonnance.nom}_${ordonnance.prenom}.pdf`));
        doc.end();

        // Envoyer le document PDF au navigateur pour qu'il s'ouvre automatiquement
        res.setHeader('Content-disposition', 'inline; filename="' + `${ordonnance.nom}_${ordonnance.prenom}.pdf` + '"');
        res.setHeader('Content-type', 'application/pdf');
        doc.pipe(res);


        console.log('Le fichier PDF a été créé avec succès !');
    } catch (error) {
        console.error(error);
    }

};