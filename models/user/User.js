// Require mongoose module
const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Ensure uniqueness of email
  },
  password : {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  mobile:{
    type: String,
    required: false
  },

  role: {
    type: String,
    required : true
  },
  
  createdAt: {
    type: Date,
    required: false
  }
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

// Export the model to be used in other parts of your application
module.exports = User;
