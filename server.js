const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const cors = require("cors");
const rdvroutes = require("./serveur/routes/rdvroute");

const connectDB = require('./serveur/base_donnee/connexion');

const app = express();

dotenv.config({ path: 'config.env' })
const PORT = process.env.PORT || 8080

// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }))

// set view engine
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))

app.use(express.urlencoded({ extended: false }))

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

//load routers
app.use('/', require('./serveur/routes/router'))

// Import routes
const ordonnanceRoutes = require("./serveur/routes/ordonnance.js");
const certificatRoutes = require("./serveur/routes/certificat.js");
const consultationRoutes = require("./serveur/routes/consultation.js");

// route Middlewares
app.use('/', require('./serveur/routes/ordonnance'))
app.use('/', require('./serveur/routes/certificat'))
app.use('/', require('./serveur/routes/consultation'))

//routes authentification
const SignUpRouter = require('./serveur/routes/inscription');
const LogInRouter = require('./serveur/routes/connexion');
const changeIdRouter = require('./serveur/routes/change');
const protectRouter = require('./serveur/routes/protect');
const passwordForgetRouter = require('./serveur/routes/resetPassword');
const addAccountRouter = require('./serveur/routes/addAccount');
const deleteAccountRouter = require('./serveur/routes/deleteAccount');
const addDoctorRouter = require('./serveur/routes/doctor');
require('./serveur/middlewares/auth');


app.use(express.json());
app.use(protectRouter);
app.use(SignUpRouter);
app.use(LogInRouter);
app.use(changeIdRouter);
app.use(passwordForgetRouter);
app.use(addAccountRouter);
app.use(deleteAccountRouter);
app.use(addDoctorRouter);

//routes rdv
app.use('/rdv', rdvroutes);


app.get('/', (req, res) => {
    res.redirect('accueil');
});
// Définition des routes
app.get('/accueil', (req, res) => {
    res.render('accueil');
});
app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/cantact', (req, res) => {
    res.render('cantact');
});

app.get('/connexion', (req, res) => {
    res.render('connexion');
});
app.get('/inscription', (req, res) => {
    res.render('inscription');
});

app.get('/index-rdv', (req, res) => {
    res.render('index_rdv');
});
app.get('/user', (req, res) => {
    res.render('user');
});
app.get('/mdp', (req, res) => {
    res.render('mdp');
});
app.get('/mail', (req, res) => {
    res.render('mail');
});

app.get('/Gestioncompte', (req, res) => {
    res.render('Gestioncompte');
});
app.get('/ajouter-ass', (req, res) => {
    res.render('ajouter-ass');
});

app.get('/index-dossier', (req, res) => {
    res.render('index_dossier');
});

app.get('/ordonances', (req, res) => {
    res.render('ordonances');
});
app.get('/ajouter-ordonance', (req, res) => {
    res.render('ajouter-ordonance');
});
app.get('/certificats', (req, res) => {
    res.render('certificats');
});
app.get('/ajouter-certificat', (req, res) => {
    res.render('ajouter-certificat');
});
app.get('/consultations', (req, res) => {
    res.render('consultations');
});
app.get('/ajouter-consultation', (req, res) => {
    res.render('ajouter-consultation');
});
app.get('/voir_consultation', (req, res) => {
    res.render('voir_consultation');
});

app.listen(PORT, () => { console.log(`Le serveur est sur http://localhost:${PORT}`) });