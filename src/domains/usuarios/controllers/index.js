const router = require('express').Router();
const Usuario = require('../models/Usuario');

router.get('/', (req, res) => {
	res.send(Usuario.findAll());
});

module.exports = Usuario;