const router = require('express').Router();
const Artista = require('../models/Artista');
const ArtistaService=require('../services/artistaService');


router.get('/', async(req,res) => {
	try {
		const artistas=await ArtistaService.listaTodos();
		res.status(200).send(artistas);
	} catch (error) {
		res.status(404).send(error.message);
	}
});

router.post('/',async(req, res) => {
	const novoArtista=req.body;
	try {
		await ArtistaService.criacao(novoArtista);
		res.status(201).send('Artista criado com sucesso!');
	} catch (error) {
		res.status(404).send(error.message);
	}
});

router.put('/:id',async (req, res) => {
	const id=req?.params.id;
	const artistaUpdate=req?.body;
	try {
		await ArtistaService.alteracao(artistaUpdate, id);
		res.status(201).send('Artista alterado com sucesso');
	} catch (error) {
		res.status(404).send(error.message);
	}
});

router.delete('/:id',async (req, res) => {
	const id=req?.params.id;
	try {
		ArtistaService.delecao(id);
		res.status(201).send('Artista deletado com sucesso!');
	} catch (error) {
		res.status(404).send(error.message);
	}
});

module.exports = router;