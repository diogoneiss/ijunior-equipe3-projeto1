const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

const musicaRouter = require('../src/domains/musicas/controllers/index');
app.use('/api/musica', musicaRouter);

const usuarioRouter=require('../src/domains/usuarios/controllers/index');
app.use('/api/usuarios',usuarioRouter);


module.exports = app;