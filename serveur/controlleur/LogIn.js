const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
// ajouter bodyparser comme middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import du modèle User
const User = require('../modele/User');
const userValidation = require('../validation/validation');



exports.Connexion = async (req, res) => {
   // recupérer les données
   // const { email, password } = req.body;
   const email = req.body.email;
   const password = req.body.password;
   // validation des données 
   const { error } = userValidation(req.body).userValidationLogin;
   if (error) return res.status(400).send(error.details[0].message);

   // trouver l'utilisateur dans la base de données 
   const user = await User.findOne({ email });
   if (!user) {
      return res.status(404).json({ msg: "User not found" });
   }

   // verifier si le mdp est correcte
   const isPasswordValid = await bcrypt.compare(password, user.password);
   if (!isPasswordValid) {
      return res.status(401).json({ msg: 'Invalid email or password ' });
   }

   // Generate and return authentication token
   const token = jwt.sign({ id: user._id }, 'SECRET_KEY', { expiresIn: '12h' });

   // Renvoyer les informations de l'utilisateur avec le token
   const useractuel = {
      id: user._id,
      email: user.email,
      role: user.role,
      nom: user.firstName,
      prenom: user.lastName,
      token: token,
   }
   //if (user.role === 'doctor') {
   // Renvoyer le fichier index_fiche.ejs si le rôle est "assistante"
   global.compte = useractuel;
   res.render('user', { compte: useractuel });
   // }
   //res.render('user', { user: useractuel });
   //else {
   //   return res.status(404).json({ msg: "vous etes pas un medecin" });
   //}
};



















