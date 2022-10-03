const router = require('express').Router();
const Artista = require('../models/Artista');
const ArtistaService=require('../services/artistaService');
const authMiddleware=require('../../../middlewares/authMiddlewares');

router.get('/', async(req, res, next) => {
	try {
		const artistas=await ArtistaService.listaTodos();
		res.status(200).send(artistas);
	} catch (error) {
		next(error);
	}
});

router.post('/', authMiddleware, async(req, res, next) => {
	const novoArtista=req.body;
	try {
		await ArtistaService.criacao(novoArtista);
		res.status(201).send('Artista criado com sucesso!');
	} catch (error) {
		next(error);
	}
});

router.put('/:id',authMiddleware,async (req, res, next) => {
	const id=req?.params.id;
	const artistaUpdate=req?.body;
	try {
		await ArtistaService.alteracao(artistaUpdate, id);
		res.status(201).send('Artista alterado com sucesso');
	} catch (error) {
		next(error);
	}
});

router.delete('/:id',authMiddleware,async (req, res, next) => {
	const id=req?.params.id;
	try {
		ArtistaService.delecao(id);
		res.status(201).send('Artista deletado com sucesso!');
	} catch (error) {
		next(error);
	}
});

module.exports = router;