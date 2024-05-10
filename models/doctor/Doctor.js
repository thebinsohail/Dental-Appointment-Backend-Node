const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
    user: {
        type: Object,
        required: true
    },
    status:{
        type: String,
        required : true,
        default: 'INACTIVE'
    },
    qualification: {
        type: String,
        required: true
    },
    experience: {
        type: Object,
        required: false
    },

    availability : {
        type: Object,
        required: false
    }
    
});

// Create a model based on the schema
const Doctor = mongoose.model('Doctor', doctorSchema);

// Export the model to be used in other parts of your application
module.exports = Doctor;
