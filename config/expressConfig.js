const express = require('express');
const errorHandler=require('../src/middlewares/errorHandler');

const app = express();

const cookieParser=require('cookie-parser');
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

const musicaRouter = require('../src/domains/musicas/controllers/index');
app.use('/api/musica', musicaRouter);

const usuarioRouter=require('../src/domains/usuarios/controllers/index');
app.use('/api/usuarios',usuarioRouter);

const artistaRouter = require('../src/domains/artistas/controllers/index');
app.use('/api/artistas',artistaRouter);

app.use(errorHandler);


module.exports = app;