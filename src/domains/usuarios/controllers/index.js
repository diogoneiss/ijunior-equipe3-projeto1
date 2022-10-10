const router = require('express').Router();
const UsuarioService = require('../service/UsuarioService');
const {authMiddleware, 
	notLoggedIn, 
	loginMiddleware,
	logoutMiddleware,
	checkRole}=require('../../../middlewares/authMiddlewares');

router.post('/login',notLoggedIn, loginMiddleware);
router.post('/logout',logoutMiddleware);

router.get('/', authMiddleware, async (req, res, next) => {
	try {
		const allUsers = await UsuarioService.listarTodos();
		res.status(200).send(allUsers);
	} catch (error) {
		next(error);
	}

});

//rota de criacao de usuarios nao eh protegida pelo authMiddleware pois todos podem criar uma conta
router.post('/', async (req, res, next) => {
	const body = req.body;
	try {
		await UsuarioService.criacao(body);
		res.status(201).send('Usuario criado com sucesso!');
	} catch (error) {
		next(error);
	}
});


router.put('/:id', authMiddleware, checkRole, async (req, res, next) => {
	const id=req?.params.id;
	const usuarioUpdate=req?.body;
	try {
		await UsuarioService.alteracao(usuarioUpdate, id, req.user);
		res.status(204).send('Usuario alterado com sucesso');
	} catch (error) {
		next(error);
	}
});


router.delete('/:id', authMiddleware, checkRole, async (req, res, next) => {
	const id=req?.params.id;
	try {
		await UsuarioService.delecao(id);
		res.status(204).send('Usuario deletado com sucesso!');
	} catch (error) {
		next(error);
	}
});

module.exports = router;