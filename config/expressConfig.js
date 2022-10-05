const express = require('express');
const errorHandler=require('../src/middlewares/errorHandler');
const swaggerUi = require('swagger-ui-express');
require ('dotenv').config();

const app = express();

const cors = require('cors');
app.use(cors({
	origin: process.env.CLIENT_URL,
	credentials: true
}));

const cookieParser=require('cookie-parser');
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));


// if swagger file not found throw error
try {
	const swaggerDocument = require('../swagger_output.json');

	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
catch (err) {
	console.log('Swagger file not found');
	console.log('You can generate it by running \'npm run doc\' or \'node swagger.js\'');
	console.log(err.message);
	throw Error('Swagger file not found');
}

console.log('Swagger route created! enter http://localhost:3030/api-docs/ to see the documentation');

const musicaRouter = require('../src/domains/musicas/controllers/index');
app.use('/api/musica', musicaRouter);

const usuarioRouter=require('../src/domains/usuarios/controllers/index');
app.use('/api/usuarios',usuarioRouter);

const artistaRouter = require('../src/domains/artistas/controllers/index');
app.use('/api/artistas',artistaRouter);

app.use(errorHandler);


module.exports = app;