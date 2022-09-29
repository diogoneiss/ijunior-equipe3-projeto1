const router = require('express').Router();
const Usuario = require('../models/Usuario');
const UsuarioService = require('../service/UsuarioService');
const checkRole=require('../../../middlewares/checkRole');


router.get('/', async (req, res, next) => {
	try {
		const allUsers = await UsuarioService.listarTodos();
		return res.status(201).send(allUsers);
	} catch (error) {
		next(error);
	}


});

router.post('/', async (req, res, next) => {
	const body = req.body;
	try {
		await UsuarioService.criacao(body);
		return res.status(201).json('Usuario criado com sucesso!');
	} catch (error) {
		next(error);
	}
});

//todo: implementar checkrole
router.put('/:id', async (req, res, next) => {
	const id=req?.params.id;
	const usuarioUpdate=req?.body;
	try {
		await UsuarioService.alteracao(usuarioUpdate, id);
		res.status(201).send('Usuario alterado com sucesso');
	} catch (error) {
		next(error);
	}
});

//todo: implementar checkRole
router.delete('/:id',async (req, res, next) => {
	const id=req?.params.id;
	try {
		await UsuarioService.delecao(id);
		res.status(201).send('Usuario deletado com sucesso!');
	} catch (error) {
		next(error);
	}
});

module.exports = router;