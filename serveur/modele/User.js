const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const validate = require('mongoose-validator');

const confirmPasswordValidator = [
  validate({
    validator: function (value) {
      return this.password === value;
    },
    message: 'Passwords do not match'
  })
];

const passwordValidator = [
  validate({
    validator: 'isLength',
    arguments: [8, 100],
    message: 'Password should be between {ARGS[0]} and {ARGS[1]} characters'
  })
];


const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 20
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 20
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Invalid email address'
    }
  },
  dateOfBirth: {
    type: String,
    required: true
  },
  placeOfBirth: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 100,
    validate: passwordValidator
  },
  confirmPassword: {
    type: String,

    minlength: 8,
    maxlength: 100,
    validate: confirmPasswordValidator
  },

  phone: {
    type: String,
    //required : true , 
    validate: {
      validator: (value) => validator.isMobilePhone(value),
      message: 'Invalid phone number'
    }
  },

  role: {
    type: String,
    enum: ['Patient', 'Dentsite', 'Assistant'],
    default: 'Patient'
  },

  resetPasswordToken: String,
  resetPasswordExpires: Date

});

const User = mongoose.model('User', UserSchema);
module.exports = User;
