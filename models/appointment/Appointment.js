const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
    user: {
        type: Object,
        required : true
    },

    doctor: {
        type: Object,
        required: false
    },

    patientName: {
        type: String,
        required: true
    },
    consultant:{
        type: Object,
        required: false
    },
    mobile: {
        type: String,
        required: true
    },
    dateOfAppointment: {
        type: Date,
        required : true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status : {
        type : String,
        required: true
    }
});


// Create a model based on the schema
const Appointment = mongoose.model('Appointment', appointmentSchema);

// Export the model to be used in other parts of your application
module.exports = Appointment;
