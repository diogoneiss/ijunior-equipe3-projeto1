const Usuario = require('../models/Usuario');

class UsuarioService {
	async criacao(usuario) {
		await Usuario.create(usuario);
	}
	async listarTodos() {
		return await Usuario.findAll();
	}
	//altera uma musica usando como chave principal a propria PK
	async alteracao(update, id){
		const usuarioOriginal = await Usuario.findByPk(id);
		//checa se a key enviada existe
		if (usuarioOriginal === null) {
			throw new Error('O usuario enviado nao existe');
		}

		//atualiza os campos do usuario selecionado e os salva
		usuarioOriginal.nome=update?.nome || usuarioOriginal?.nome|| '';
		usuarioOriginal.email= update?.email || usuarioOriginal?.email || '';
		usuarioOriginal.senha=update?.senha || usuarioOriginal?.senha || '';
		usuarioOriginal.cargo=update?.cargo|| usuarioOriginal?.cargo || '';

		await usuarioOriginal.save();
	}
	async delecao(id){
		const usuario = await Usuario.findByPk(id);
		//checa se a key enviada existe
		if (usuario === null) {
			throw new Error('O usuario selecionado nao existe');
		}
		await usuario.destroy();
	}
};

module.exports = new UsuarioService();