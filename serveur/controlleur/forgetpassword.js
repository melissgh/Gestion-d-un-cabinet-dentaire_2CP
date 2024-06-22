const express = require('express');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const nodemailer = require('nodemailer');
const User = require('../modele/User');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 't_moulai@estin.dz',
    pass: 'hiitsmetinhinane789'
  },

  tls: {
    rejectUnauthorized: false
  },
  secure: 'true'


});


exports.PasswordForget = async (req, res) => {
  const { email } = req.body;

  //Validate that the email field is not empty
  if (!email) {
    return res.status(400).send('Email is required');
  }

  // Find the user record in the database
  const user = await User.findOne({ email });

  // Generate a unique password reset token and save it to the user record
  const token = crypto.randomBytes(20).toString('hex');
  const hashedToken = await bcrypt.hash(token, 10);
  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour


  await user.save();
  const resetPasswordLink = 'http://localhost:3000/reset-password/${token}'
  const mailOptions = {
    to: email,
    from: 't_moulai@estin.dz',
    subject: 'Reset your password',
    text: `Please click on the following link, or paste this into your browser to reset your password: ${resetPasswordLink}\n\n`,
  };




  // Return a success response to the user
  return res.status(200).send(`Password reset email has been sent to ${email}`);
};

exports.PasswordReset = async (req, res) => {
  try {
    const { token } = req.params;
    const { email, password, confirmPassword } = req.body;
    // Validate that all fields are not empty
    if (!email || !token || !password || !confirmPassword) {
      return res.status(400).send('All fields are required');
    }

    // Find the user record in the database
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Validate the password reset token
    const isTokenValid = await bcrypt.compare(token, user.resetPasswordToken);
    if (!isTokenValid || user.resetPasswordExpires < Date.now()) {
      return res.status(400).send('Invalid or expired password reset token');
    }

    // Validate the new password and confirm password
    if (password !== confirmPassword) {
      return res.status(400).send('Passwords do not match');
    }

    // Hash the new password and save it to the user record
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });

  }
};



































