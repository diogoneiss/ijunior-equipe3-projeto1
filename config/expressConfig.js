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

const artistaRouter = require('../src/domains/artistas/controllers/index');
app.use('/api/artistas',artistaRouter);

//todo: separar na pasta correta dos middlewares
function errorHandler(error,req,res,next){
	if(error.message=='O usuario selecionado nao existe'){
		res.sendStatus(404);
	}
    res.sendStatus(500);
}

app.use(errorHandler);


module.exports = app;