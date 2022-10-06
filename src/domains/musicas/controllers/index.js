const express = require('express');
const router = express.Router();
const MusicaService = require('../service/MusicaService');
const {authMiddleware, 
	checkRole}=require('../../../middlewares/authMiddlewares');


//Envia a lista de musicas
router.get('/', authMiddleware, async (req, res, next) => {
	try {
		const listaMusicas = await MusicaService.listaTodos();
		res.status(200).send(listaMusicas);
	} catch (error) {
		next(error);
	}
});

//Adiciona uma musica
router.post('/', authMiddleware, async(req, res, next) => {
	try {
		let newMusica = {
			titulo: req?.body.titulo || '',
			foto: req?.body.foto || '',
			categoria: req?.body.categoria || '',
			ArtistaID: req?.body.ArtistaID || 0
		};

		await MusicaService.criacao(newMusica);
		res.status(200).json('musica adicionada com sucesso!');
	}
	catch (error) {
		next(error);

	}

});

//Remove uma musica usando como chave principal seu id
router.delete('/:id', authMiddleware, checkRole,async(req, res, next) => {
	try {
		const id=req?.params.id;
		await MusicaService.delecao(id);
		res.status(200).send('Musica deletada com sucesso!');
	} catch (error) {
		next(error);
	}
});

//Altera uma musica, usando como chave principal seu id
router.put('/:id', authMiddleware,checkRole, async(req, res, next) => {
	try {
		const updateMusica=req?.body;
		const id=req?.params.id;
		await MusicaService.alteracao(updateMusica,id);
		res.status(201).send('Musica alterada com sucesso!');
	} catch (error) {
		next(error);
	}

});


module.exports = router;