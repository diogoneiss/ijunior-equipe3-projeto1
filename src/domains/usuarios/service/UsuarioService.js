const bcrypt = require('bcrypt');
const InvalidParametersError = require('../../../../errors/InvalidParametersError');
const NotAuthorizedError = require('../../../../errors/NotAuthorizedError');
const userRoles = require('../constants/userRoles');
const Usuario = require('../models/Usuario');

class UsuarioService {

	//criptografa a senha usando a biblioteca Bcrypt
	async criptografarSenha(senha){
		const saltRounds=10;
		const senhaCriptografada= await bcrypt.hash(senha, saltRounds);
		return senhaCriptografada;
	}


	//cria um usuario com base no body recebido
	async criacao(body) {
		//A criacao de usuarios administradores nao pode ser realizada por qualquer um, deve haver um protocolo para isso
		if(body.cargo==userRoles.admin){
			throw new NotAuthorizedError('Nao eh possivel criar um usuario com cargo de admin');
		}
		//procura se ja existe um usuario cadastrado com o email requisitado
		//se nao, cria um objeto usuario e o cria no BD 
		const user=await Usuario.findOne({where: {email: body.email}});
		if(user){
			throw new InvalidParametersError('Email ja cadastrado');
		}else{
			const user ={
				nome: body.nome,
				email: body.email,
				senha: body.senha,
				cargo: body.cargo
			};
			user.senha = await this.criptografarSenha(body.senha);

			await Usuario.create(user);
		}
		//criptografa a senha antes de manda-la ao banco de dados

	}


	//retorna todos os usuarios
	async listarTodos() {
		return await Usuario.findAll();
	}

	
	//altera uma musica usando como chave principal a propria PK
	async alteracao(update, id, loggedUser){
		const usuarioOriginal = await Usuario.findByPk(id);
		//checa se a key enviada existe
		if (usuarioOriginal === null) {
			throw new InvalidParametersError(`O usuario com a id ${id} nao existe`);
		}

		if(loggedUser.cargo!=userRoles.admin && update.id!=loggedUser.id){
			throw new InvalidParametersError('Voce so pode alterar as informacoes de seu usuario');
		}

		//atualiza os campos do usuario selecionado e os salva
		usuarioOriginal.nome=update?.nome || usuarioOriginal?.nome|| '';
		usuarioOriginal.email= update?.email || usuarioOriginal?.email || '';
		usuarioOriginal.cargo=update?.cargo|| usuarioOriginal?.cargo || '';

		if(update.senha){
			// const senhasIguais = await bcrypt.compare(update.senha,usuarioOriginal.senha);
			// if(senhasIguais){
			// 	throw new InvalidParametersError('Sua nova senha nao pode ser identica a anterior!');
			// }
			// update.senha= await this.criptografarSenha(update.senha);

			bcrypt.compare(update.senha,usuarioOriginal.senha,async (err,result)=>{
				if(err){
					throw new InvalidParametersError('Sua nova senha nao pode ser identica a anterior!');
				}
				update.senha= await this.criptografarSenha(update.senha);
			});
		}

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