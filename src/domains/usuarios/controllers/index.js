const router = require('express').Router();
const Usuario = require('../models/Usuario');
const UsuarioService = require('../service/UsuarioService');

router.get('/', async (req, res) => {
	try {
		const allUsers = await UsuarioService.listarTodos();
		return res.status(201).send(allUsers);
	} catch (error) {
		return res.status(400).send(error);
	}


});

router.post('/', async (req, res) => {
	const body = req.body;
	try {
		await UsuarioService.criacao(body);
		return res.status(201).json('Usuario criado com sucesso!');
	} catch (error) {
		return res.status(400).send(error);
	}
});

router.put('/:id',async (req, res) => {
	const id=req?.params.id;
	const usuarioUpdate=req?.body;
	try {
		await UsuarioService.alteracao(usuarioUpdate, id);
		res.status(201).send('Usuario alterado com sucesso');
	} catch (error) {
		res.status(404).send(error.message);
	}
});

router.delete('/:id',async (req, res) => {
	const id=req?.params.id;
	try {
		await UsuarioService.delecao(id);
		res.status(201).send('Usuario deletado com sucesso!');
	} catch (error) {
		res.status(404).send(error.message);
	}
});

module.exports = router;