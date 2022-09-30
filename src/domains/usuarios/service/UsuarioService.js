const InvalidParametersError = require('../../../../errors/InvalidParametersError');
const Usuario = require('../models/Usuario');

class UsuarioService {
	//cria um usuario com base no body recebido
	async criacao(usuario) {
		const user=await findOne({where: (email=usuario.email)});
		if(user){
			throw new InvalidParametersError('Email ja cadastrado');
		}
		await Usuario.create(usuario);
	}

	//retorna todos os usuarios
	async listarTodos() {
		return await Usuario.findAll();
	}

	
	//altera uma musica usando como chave principal a propria PK
	async alteracao(update, id){
		const usuarioOriginal = await Usuario.findByPk(id);
		//checa se a key enviada existe
		if (usuarioOriginal === null) {
			throw new InvalidParametersError(`O usuario com a id ${id} nao existe`);
		}

		//atualiza os campos do usuario selecionado e os salva
		usuarioOriginal.nome=update?.nome || usuarioOriginal?.nome|| '';
		usuarioOriginal.email= update?.email || usuarioOriginal?.email || '';
		usuarioOriginal.senha=update?.senha || usuarioOriginal?.senha || '';
		usuarioOriginal.cargo=update?.cargo|| usuarioOriginal?.cargo || '';

		await usuarioOriginal.save();
	}


	//deleta um usuario com base na sua PK
	async delecao(id){
		const usuario = await Usuario.findByPk(id);
		//checa se a key enviada existe
		if (usuario === null) {
			throw new InvalidParametersError(`O usuario com a id ${id} nao existe`);
		}
		await usuario.destroy();
	}
};

module.exports = new UsuarioService();