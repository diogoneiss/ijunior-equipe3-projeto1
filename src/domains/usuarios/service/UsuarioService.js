const bcrypt = require('bcrypt');
const InvalidParametersError = require('../../../../errors/InvalidParametersError');
const NotAuthorizedError = require('../../../../errors/NotAuthorizedError');
const userRoles = require('../constants/userRoles');
const Usuario = require('../models/Usuario');

class UsuarioService {

	//criptografa a senha usando a biblioteca Bcrypt
	async criptografarSenha(senha){
		const saltRounds=10;
		if(senha === undefined){
			throw Error('Senha não informada');
		}
		const senhaCriptografada = await bcrypt.hash(senha, saltRounds);
		return senhaCriptografada;
	}


	//cria um usuario com base no body recebido
	async criacao(body) {
		//A criacao de usuarios administradores nao pode ser realizada por qualquer um, deve haver um protocolo para isso
		if(body.cargo==userRoles.admin){
			//verificar se a requisicao passou no body a senha de acesso total
			const senhaAcessoTotal = process.env.SENHA_ACESSO_TOTAL;
			if(body?.senhaAcessoTotal!=senhaAcessoTotal){
				throw new NotAuthorizedError('Nao eh possivel criar um usuario com cargo de admin sem a senha de acesso total. Caso a tenha, passe ela no body da requisicao como \'senhaAcessoTotal: \'');
			}
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
			const senhaHasheada = await this.criptografarSenha(body.senha);
			user.senha = senhaHasheada;
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

		//um usuario pode alterar apenas as informacoes de seu proprio campo
		if(loggedUser.cargo!=userRoles.admin && id!=loggedUser.id){
			throw new InvalidParametersError('Voce so pode alterar as informacoes de seu usuario');
		}

		//atualiza os campos do usuario selecionado e os salva
		usuarioOriginal.nome=update?.nome || usuarioOriginal?.nome|| '';
		usuarioOriginal.email= update?.email || usuarioOriginal?.email || '';
		usuarioOriginal.cargo=update?.cargo|| usuarioOriginal?.cargo || '';

		//testa se a senha nova bate eh diferente da anterior
		if(update.senha){
			const senhasIguais = await bcrypt.compare(update.senha,usuarioOriginal.senha);
			if(senhasIguais){
				throw new InvalidParametersError('Sua nova senha nao pode ser identica a anterior!');
			}
			update.senha= await this.criptografarSenha(update.senha);

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