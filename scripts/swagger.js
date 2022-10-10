const swaggerAutogen = require('swagger-autogen');
const outputFile = '../swagger_output.json';
const endpointsFiles = ['../config/expressConfig.js']; // root file where the route starts.

swaggerAutogen(outputFile, endpointsFiles).then(() => {
	require('../config/expressConfig.js');           // Your project's root file
});