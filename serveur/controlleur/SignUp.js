const express = require('express');
const bcrypt = require('bcrypt');

const Fiche = require('../modele/modele')
const User = require('../modele/User');
const Dossier = require('../modele/dossier.js');
const userValidation = require('../validation/validation');


exports.Inscription = async (req, res) => {
  const { firstName, lastName, email, dateOfBirth, placeOfBirth, gender, password, confirmPassword, phone } = req.body;

  // Validation des données de l'utilisateur
  const { error } = userValidation(req.body).userValidationSignUp;
  if (error) return res.status(400)
    // .send(error.details[0].message)
    ;

  // Vérification si l'utilisateur n'existe pas déjà
  const userExist = await User.findOne({ email: req.body.email });
  if (userExist) return res.status(400).send('Cet email existe déjà.');

  // Vérification si les mots de passe sont identiques


  // Hachage du mot de passe de l'utilisateur
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Création d'un nouvel utilisateur
  const user = new User({
    firstName,
    lastName,
    email,
    dateOfBirth,
    placeOfBirth,
    gender,
    password: hashedPassword,
    phone

  });
  const userInscri = {
    id: user._id,
    email: user.email,
    role: user.role,
    nom: user.firstName,
    prenom: user.lastName
  };

  // creation d'une fiche 
  const fiche = new Fiche({
    nom: lastName,
    prenom: firstName,
    email: email,
    date_naissance: dateOfBirth,
    lieu_naissance: placeOfBirth,
    sexe: gender,
    telephone: phone

  });

  // new consultation
  const dossier = new Dossier({
    nom: firstName,
    prenom: lastName
  });


  global.compte = userInscri;
  // Enregistrement de l'utilisateur et de la fiche dans la base de données
  try {
    const [savedUser, savedFiche, savedDossier] = await Promise.all([user.save(), fiche.save(), dossier.save()]);

    // res.send({ user: savedUser, fiche: savedFiche });
    res.render('user', { compte: userInscri });

  } catch (error) {
    // res.redirect('/inscription');
    res.status(400).json({ error: error.message });
  }


}