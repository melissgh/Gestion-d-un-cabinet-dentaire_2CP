const Certificat = require('../modele/certificat.js');
const PDFDocument = require('pdfkit');
const fs = require('fs');

exports.getCertificats = async (req, res) => {
    try {
        const certificats = await Certificat.find({});
        res.status(200).json(certificats);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

exports.getCertificat = async (req, res) => {
    try {
        const { id } = req.params;
        const certificat = await Certificat.findById(id);
        res.status(200).json(certificat);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.creatCertificat = async (req, res) => {
    try {
        // Créer une nouvelle ordonnance
        const certificat = await Certificat.create(req.body);

        // Initialiser un nouveau document PDF
        const doc = new PDFDocument();

        // Écrire les informations de l'ordonnance dans le document PDF
        doc.text(`                                      CERTIFICAT MÉDICAL\n\n\n\n    Je soussigné(e), Dr.ZIZI, dentiste généraliste, certifie avoir examiné M. ${certificat.nom} ${certificat.prenom} et établis le diagnostic suivant : ${certificat.note}.\n\n\n Certificat etabli à Aokas 06007\n\n\nDate: ${certificat.date}                       Signtaure du dentiste:\n\n\n                                                    Tampon du dentiste:`);

        // Enregistrer le document PDF dans un fichier
        const pdfFilePath = `${certificat.nom}_${certificat.prenom}.pdf`;
        doc.pipe(fs.createWriteStream(pdfFilePath));
        doc.end();

        // Envoyer le document PDF au navigateur pour qu'il s'ouvre automatiquement
        res.setHeader('Content-disposition', `inline; filename="${pdfFilePath}"`);
        res.setHeader('Content-type', 'application/pdf');
        doc.pipe(res);

        console.log('Le certificat et le fichier PDF ont été créés avec succès !');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

exports.deleteCertificat = (req, res) => {
    const id = req.params.id;

    Certificat.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
            } else {
                res.send({
                    message: "certificat was deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete certificat with id=" + id
            });
        });
};


exports.imprimerCertificat = async (req, res) => {
    try {
        // Trouver la personne dans la base de données MongoDB
        const { id } = req.params;
        const certificat = await Certificat.findById(id);

        // Initialiser un nouveau document PDF
        const doc = new PDFDocument();

        // Écrire les informations de la personne dans le document PDF
        doc.text(`                                      CERTIFICAT MÉDICAL\n\n\n\n    Je soussigné(e), Dr.ZIZI, dentiste généraliste, certifie avoir examiné M. ${certificat.nom} ${certificat.prenom} et établis le diagnostic suivant : ${certificat.note}.\n\n\n Certificat etabli à Aokas 06007\n\n\nDate: ${certificat.date}                      `);

        // Enregistrer le document PDF dans un fichier
        doc.pipe(fs.createWriteStream(`${certificat.nom}_${certificat.prenom}.pdf`));
        doc.end();

        // Envoyer le document PDF au navigateur pour qu'il s'ouvre automatiquement
        res.setHeader('Content-disposition', 'inline; filename="' + `${certificat.nom}_${certificat.prenom}.pdf` + '"');
        res.setHeader('Content-type', 'application/pdf');
        doc.pipe(res);


        console.log('Le fichier PDF a été créé avec succès !');
    } catch (error) {
        console.error(error);
    }

};