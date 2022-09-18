const express = require('express');
const router = express.Router();
const MusicaService = require('../service/MusicaService');

//CONTROLLER NAO FUNCIONAL POIS O MODELO ATUAL DE MUSICA NAO EH UM ARRAY

// optei por deixar mutável para conseguir usar funções de ordem superior, como filter
let Musica = require('../models/Musica');

//Envia a lista de musicas
router.get('/', (req, res) => {
	if (Musica != undefined) {
		res.status(200).send(Musica);
	} else {
		res.status(404).send('Nenhuma musica cadastrada');
	}

});



//Adiciona uma musica
router.post('/', async(req, res) => {
	try {
		newMusica = {
			titulo: req.body.nome || '',
			foto: req.body.foto || '',
			categoria: req.body.categoria || '',
			artistaID: req.body.artistaID || 0.
		};

		await MusicaService.criacao(newMusica);
		res.status(200).json('musica adicionada com sucesso!');
	}
	catch (e) {
		res.status(500).send(e.message);

	}

});

//Remove uma musica usando como chave principal seu nome
router.delete('/', (req, res) => {
	const oldLength = Musica.length;
	const queryNome = req.body?.nome;

	if (queryNome === undefined) {
		res.status(400).send('Faltou enviar o  "nome" da musica quer voce quer remover no body');
	}

	//mantem apenas os elementos que o nome é diferente do da request
	const modMusica = Musica.filter(m => m.nome !== queryNome);

	//se o comprimento nao mudou, nao encontrou musica com esse nome
	if (modMusica.length == oldLength) {
		res.status(404).send('Musica nao encontrada.\nConfira as musicas existentes com o GET e envie o parametro "nome" seguido da musica quer voce quer remover.');
	}

	Musica = modMusica;
	res.status(200).send();

});

//Altera uma musica, usando como chave principal seu nome
router.put('/', (req, res) => {


	const queryNome = req.body?.nome;
	console.log('Modificando: ', queryNome);


	if (queryNome === undefined) {
		res.status(400).send('Faltou enviar o  "nome" da musica quer voce quer alterar no body');
	}

	//Acha as musicas que atendem a modificacao.
	//Seria legal usar um criterio de desempate, como no caso de varios albuns, 
	//mas acredito que isso está fora do escopo desse trabalho kkkkk

	//achar o primeiro elemento que atende
	const modMusica = Musica.filter(m => m.nome === queryNome);


	//se nao encontrou musica com esse nome
	if (modMusica.length === 0) {
		res.status(404).send('Musica nao encontrada.\nVerifique se o objeto musica, com a chave de busca "nome", existe na base, com o endpoint GET.');

	}

	//recuperar o objeto original a partir da busca de antes
	const musicaOriginal = modMusica[0];

	const novaMusica = {
		nome: queryNome,
		artista: req.body?.artista || musicaOriginal?.artista || '',
		genero: req.body?.genero || musicaOriginal?.genero || '',
		quantidadeDownloads: req.body?.quantidadeDownloads || musicaOriginal.quantidadeDownloads || ''
	};

	//hora de substituir no objeto original
	Musica[Musica.indexOf(musicaOriginal)] = novaMusica;

	res.status(200).send();

});


module.exports = router;