const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const User = require('../modele/User');
const bcrypt = require('bcrypt');
const userValidation = require('../validation/validation');


const app = express();
app.use(bodyParser.json());

// change the password 
exports.changemdp = async (req, res) => {
  console.log("change password");

  const id = req.params.id;

  const { currentPassword, newPassword } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the current password is correct
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user password
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );
    res.redirect('/connexion');
    // return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

// change the email
exports.changeEmail = async (req, res) => {
  try {
    const id = req.params.id;
    const { newEmail } = req.body;
    console.log(id)
    if (Object.keys(req.body).length !== 1 || !newEmail) {
      return res.status(400).json({ message: "Invalid request body" });
    }

    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the new email is already taken
    const existingUser = await User.findOne({ email: newEmail });
    if (existingUser) {
      return res.status(409).json({ error: "Email already in use" });
    }

    // Update the user email
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { email: newEmail },
      { new: true }
    );
    res.redirect('/connexion');
    //return res.status(200).json({ message: "Email changed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update email" });
  }
};








