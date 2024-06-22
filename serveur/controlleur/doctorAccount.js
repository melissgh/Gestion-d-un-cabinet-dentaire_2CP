const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Import the User model
const User = require('../modele/User');

exports.addDoctorAccount = async (req, res) => {
  // Set the data for the new doctor account
  const doctorData = {
    firstName: 'LYES',
    lastName: 'ZIZI',
    email: 'dentiste@gmail.com',
    dateOfBirth: new Date('1980-01-01'),
    placeOfBirth: 'BEJAIA',
    gender: 'Male',
    password: '123456789',
    role: 'Dentiste'
  };

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(doctorData.password, salt);

  // Create a new User object for the doctor
  const doctor = new User({
    firstName: doctorData.firstName,
    lastName: doctorData.lastName,
    email: doctorData.email,
    dateOfBirth: doctorData.dateOfBirth,
    placeOfBirth: doctorData.placeOfBirth,
    gender: doctorData.gender,
    password: hashedPassword,
    role: doctorData.role
  });

  // Save the new doctor to the database
  try {
    const savedDoctor = await doctor.save();
    // Return the new doctor as a response
    res.status(201).json(savedDoctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

}