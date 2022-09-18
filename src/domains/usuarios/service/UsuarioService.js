const Usuario = require('../models/Usuario');

class UsuarioService {
	async criacao(body) {
		await Usuario.create(body);
	}
	async listarTodos() {
		return await Usuario.findAll();
	}
};

module.exports = new UsuarioService();