const express = require('express');

const router = express.Router();

const Appointment = require('../modele/RdvModel');

const Patient = require('../modele/modele');



async function creerRendezVous(req, res) {

  try {

    // Récupération des informations du rdv

    const { date, startTime, nom, prenom, motif, confirmed } = req.body;

    const endTime = new Date(new Date(`1970-01-01T${startTime}:00Z`).getTime() + 30 * 60000).toISOString().substr(11, 5);



    // Vérification si le patient existe dans la db et admet pas une fiche

    const existingPatient = await Patient.findOne({

      nom: { $regex: new RegExp(`^${nom}$`, 'i') },

      prenom: { $regex: new RegExp(`^${prenom}$`, 'i') }

    });



    if (!existingPatient) {

      return res.status(400).json({ message: 'Ce patient n\'a pas de fiche, vous devez lui en créer une.' });

    }



    // Vérifie d'abord si le patient a déjà un rendez-vous confirmé

    const rendezvousConfirme = await Appointment.findOne({ patient: existingPatient, confirmed: true });

    if (rendezvousConfirme && rendezvousConfirme.date >= new Date()) {

      throw new Error("Vous avez déjà un rendez-vous confirmé");

    }



    // Vérification s'il y a un rendez-vous existant pour la même date et heure

    const query = {

      date,

      $or: [

        { startTime: { $lte: startTime }, endTime: { $gt: startTime } },

        { startTime: { $gte: startTime }, endTime: { $lt: endTime } },

        { startTime: { $lt: endTime }, endTime: { $gte: endTime } }

      ]

    };



    const existingAppointment = await Appointment.findOne(query);

    const overlappingAppointments = await Appointment.find({ ...query, patient: existingPatient._id });



    // Si plusieurs rendez-vous pour le même patient à la même heure, renvoyer une erreur

    if (overlappingAppointments.length > 1) {

      return res.status(400).json({ message: "Impossible de prendre plusieurs rendez-vous pour le même patient à la même heure." });

    }

    // Si plusieurs rendez-vous pour différents patients à la même heure, renvoyer une erreur

    else if (overlappingAppointments.length === 1 && existingAppointment && overlappingAppointments[0]._id.toString() !== existingAppointment._id.toString()) {

      return res.status(400).json({ message: "Impossible de prendre plusieurs rendez-vous pour différents patients à la même heure, à moins que vous ne disposiez de suffisamment de temps pour les voir tous les deux." });

    }



    // Si un rendez-vous existe déjà à la même date et heure, vérifier son statut

    if (existingAppointment) {

      if (existingAppointment.confirmed) {

        // Si le rdv est trouvé et qu'il est confirmé alors il y aura une erreur

        return res.status(400).json({ message: 'Il existe déjà un rendez-vous confirmé pour cette date et heure.' });

      } else if (new Date() < new Date(existingAppointment.endTime)) {

        // Si le rdv n'est pas confirmé mais que la date de fin est dans le futur, il y aura une erreur

        return res.status(400).json({ message: 'Vous ne pouvez pas prendre un autre rendez-vous avant que le précédent ne soit terminé.' });

      } else {

        // Si le rdv n'est pas confirmé et que la date de fin est dans le passé, on le supprime pour le remplacer par le nouveau rdv

        await Appointment.findByIdAndDelete(existingAppointment._id);

      }

    }



    // Création d'un nouveau rdv

    const appointment = new Appointment({

      date: date,

      startTime: startTime,

      endTime: endTime,

      patient: existingPatient._id,

      motif: motif,

      confirmed: confirmed

    });



    // Enregistrement du nouveau rdv dans la base de données

    const savedAppointment = await appointment.save();

    res.status(201).json(savedAppointment);

  } catch (error) {

    console.error(error);

    res.status(500).send(error.message);

  }

};



//fonction pour annuler le rendez vous

async function annulerRendezVous(req, res) {

  try {

    const { id } = req.params;



    // Recherche du rendez-vous dans la base de données

    const appointment = await Appointment.findById(id);



    if (!appointment) {

      return res.status(404).json({ message: "Le rendez-vous n'existe pas." });

    }



    // Suppression du rendez-vous

    await Appointment.findByIdAndDelete(id);



    res.json({ message: 'Le rendez-vous a été annulé avec succès.' });

  } catch (error) {

    console.error(error);

    res.status(500).send(error.message);

  }

};



module.exports = {

  creerRendezVous,

  annulerRendezVous



};
