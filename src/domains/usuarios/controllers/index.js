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

router.put('/', async (req, res) => {
	//todo
});

module.exports = router;