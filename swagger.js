const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Application',
    description: 'Appointment booking app for the patients and dentists'
  },
  host: 'localhost:8000'
};

const outputFile = './swagger-output.json';
const routes = ['./routes/*.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc).then(()=>{
  require('./server.js');
});