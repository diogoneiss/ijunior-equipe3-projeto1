const router = require('express').Router();
const Usuario = require('../models/Usuario');
const UsuarioService = require('../service/UsuarioService');
const authMiddleware=require('../../../middlewares/authMiddlewares');

//todo: login middleware

router.get('/', authMiddleware, async (req, res, next) => {
	try {
		const allUsers = await UsuarioService.listarTodos();
		res.status(201).send(allUsers);
	} catch (error) {
		next(error);
	}


});

router.post('/', authMiddleware, async (req, res, next) => {
	const body = req.body;
	try {
		await UsuarioService.criacao(body);
		res.status(201).json('Usuario criado com sucesso!');
	} catch (error) {
		next(error);
	}
});


router.put('/:id', authMiddleware, async (req, res, next) => {
	const id=req?.params.id;
	const usuarioUpdate=req?.body;
	try {
		await UsuarioService.alteracao(usuarioUpdate, id);
		res.status(201).send('Usuario alterado com sucesso');
	} catch (error) {
		next(error);
	}
});


router.delete('/:id', authMiddleware, async (req, res, next) => {
	const id=req?.params.id;
	try {
		await UsuarioService.delecao(id);
		res.status(201).send('Usuario deletado com sucesso!');
	} catch (error) {
		next(error);
	}
});

module.exports = router;