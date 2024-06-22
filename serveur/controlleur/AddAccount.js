const bcrypt = require('bcrypt');
const User = require('../modele/User');
const userValidation = require('../validation/validation');

exports.addAccount = async (req, res) => {
    const { firstName, lastName, email, dateOfBirth, placeOfBirth, gender, password, confirmPassword } = req.body;

    // Validate user data
    const { error } = userValidation(req.body).userValidationSignUp;
    if (error) return res.status(400).send(error.details[0].message);

    // Check if user already exists
    const userExist = await User.findOne({ email: email });
    if (userExist) return res.status(400).send('This email is already taken.');

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).send("Passwords do not match.");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = new User({
        firstName,
        lastName,
        email,
        dateOfBirth,
        placeOfBirth,
        gender,
        password: hashedPassword,
        confirmPassword: hashedPassword,
        role: "Assistant"
    });

    // Save the new user to the database
    try {
        const savedUser = await user.save();
        // res.send(savedUser);
        res.redirect('/Gestioncompte');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }



}
//retourner toutes les user
exports.retourner = (req, res) => {

    User.find()
        .then(utilisateur => {
            res.send(utilisateur)
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Erreurs" })
        })


}