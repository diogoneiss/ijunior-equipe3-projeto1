const router = require('express').Router();
const Usuario = require('../models/Usuario');
const UsuarioService = require('../service/UsuarioService');
const {authMiddleware, 
	notLoggedIn, 
	loginMiddleware}=require('../../../middlewares/authMiddlewares');
const checkRole=require('../../../middlewares/checkRole');

router.post('/login',notLoggedIn, loginMiddleware);
//todo: logoutmiddleware
// router.post('/logout',logoutMiddleware);

router.get('/', authMiddleware, async (req, res, next) => {
	try {
		const allUsers = await UsuarioService.listarTodos();
		res.status(201).send(allUsers);
	} catch (error) {
		next(error);
	}


});

//rota de criacao de usuarios nao eh protegida pelo authMiddleware pois todos podem criar uma conta
router.post('/', async (req, res, next) => {
	const body = req.body;
	try {
		await UsuarioService.criacao(body);
		res.status(201).json('Usuario criado com sucesso!');
	} catch (error) {
		next(error);
	}
});


router.put('/:id', authMiddleware, checkRole, async (req, res, next) => {
	const id=req?.params.id;
	const usuarioUpdate=req?.body;
	try {
		await UsuarioService.alteracao(usuarioUpdate, id, req.user);
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