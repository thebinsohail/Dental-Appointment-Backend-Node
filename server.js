const express = require ('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotEnv = require('dotenv');
const routes = require('./routes/');
const corsConfig = require('./config/CorsConfig');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const mainRoute = require('./routes/MainRoute');
const AppointmentScheduler = require('./crons/appointments/AppointmentScheduler'); 


// initialize express
const app = express();

// enable cors
// TODO: Add cors configuration
app.use(cors());

// load env variables
dotEnv.config();

app.use(express.json());

//crons

// swagger config
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/',mainRoute);
app.use('/user',routes.userRoute);
app.use('/appointment',routes.appointmentRoute);
app.use('/doctor',routes.doctorRoute);

// port config
const PORT = process.env.PORT || 8000;

// use json handlers
app.use(express.json());

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

app.listen(PORT,async () => {
    console.log(`Server is running on port ${PORT}`)
});