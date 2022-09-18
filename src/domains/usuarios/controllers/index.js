const router = require('express').Router();
const Usuario = require('../models/Usuario');

router.get('/', (req, res) => {
	res.send(Usuario.findAll());
});

router.post('/', async(req,res)=>{
	const body = req.body;
	try {
		const usuario = await Usuario.create(body);
		return res.status(201).end();
	} catch (error) {
		return res.status(400).send(error);
	}
});

module.exports = router;