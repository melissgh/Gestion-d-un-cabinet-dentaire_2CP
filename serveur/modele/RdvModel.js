const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentSchema = new mongoose.Schema({

  // la date du rendez vous

  date: {

    type: Date,

    required: true,

    validate: {

      validator: function (value) {

        return value >= Date.now();

      },

      message: 'La date doit être ultérieure à la date actuelle.'

    }

  },

  // Le début du créneau du rdv

  startTime: {

    type: String,

    required: true,

    validate: {

      validator: function (value) {

        const pattern = /^([01]\d|2[0-3]):(00|30)$/;

        const isValid = pattern.test(value);



        if (!isValid) {

          return false;

        }



        const hour = Number.parseInt(value.split(':')[0]);

        return hour >= 8 && hour <= 17;

      },

      message: 'L\'heure de début doit être au format "HH:MM" (par exemple 08:30) et être une heure pleine ou et demi entre 08:00 et 17:30.'

    }

  },



  // La fin du créneau du rdv

  endTime: {

    type: String,

    required: true,

    validate: {

      validator: function (value) {

        const pattern = /^([01]\d|2[0-3]):(00|30)$/;

        const isValid = pattern.test(value);



        if (!isValid) {

          return false;

        }



        const hour = Number.parseInt(value.split(':')[0]);

        const minute = Number.parseInt(value.split(':')[1]);



        return hour >= 8 && hour <= 17 && (hour !== 17 || minute === 30);

      },

      message: 'L\'heure de fin doit être au format "HH:MM" (par exemple 08:30), être une heure pleine ou et demi, et être comprise entre 08:30 et 18:00.'

    }

  },



  motif: {

    type: String,

    required: true,

  },



  //l'identifiant du patient qui veut prendre le Rdv

  patient: {

    type: mongoose.Schema.Types.ObjectId,

    ref: 'Patient',

    required: true

  },



  // la confirmaion de la prise de Rdv

  confirmed: {

    type: Boolean,

    default: false,

    required: true,

    validate: {

      validator: function (value) {

        return value === true || value === false;

      },

      message: 'La confirmation doit être soit true ou false.'

    }

  },



  // la disponibilité du rendez-vous

  disponibilité: {

    type: Boolean,

    default: false,

    required: true,

    validate: {

      validator: function (value) {

        return value === true || value === false;

      },

      message: 'La disponibilité doit être soit true ou false.'

    }

  },



}, { timestamps: true });



appointmentSchema.path('endTime').validate({

  validator: function (endTime) {

    var appointment = this;



    // Vérifier si la fin de rendez-vous est après le début de rendez-vous

    if (endTime <= appointment.startTime) {

      return false;

    }



    // Vérifier s'il y a des rendez-vous en conflit

    return Appointment.find({

      _id: { $ne: appointment._id }, // Exclure le rendez-vous en cours de validation

      date: appointment.date,

      $or: [

        { startTime: { $lt: appointment.startTime }, endTime: { $gt: appointment.startTime } },

        { startTime: { $lt: endTime }, endTime: { $gt: endTime } }

      ]

    }).count().exec().then(function (count) {

      return count === 0;

    });

  },

  message: 'Il y a déjà un rendez-vous prévu à cette heure.'

});



const Appointment = mongoose.model('Appointment', appointmentSchema);



module.exports = Appointment;