// TODO: Criar middleware que verifica o jwt e retorna seu tipo de usuário
// decodar jwt -> verificar se é admin ou user -> seguir para next se valido
const jwt = require('jsonwebtoken');
const bcrypt= require('bcrypt');
const NotAuthorizedError = require('../../errors/NotAuthorizedError');
const Usuario = require('../domains/usuarios/models/Usuario');
// const checkRole=require('./checkRole');


function authMiddleware (req,res,next){
	try {
		const token = (req) =>{
			if(req && req.cookies){
				return req.cookies['jwt'];
			}
		};

		if(token){
			const decoded= jwt.verify(token, process.env.SECRET_KEY);
			req.user = decoded.user;
		}else{
			throw new NotAuthorizedError('Voce precisa estar logado para realizar essa acao!');
		}

	} catch (error) {
		next(error);
	}

	//  o ideal seria fazer tudo de auth aqui, sem o checkRole, mas como ele está na especificação vou deixar
	// req.user={cargo:'admin'};
	// checkRole(req,res,next);
}

function generateJWT(user, res){
	//no cookie vamos passar o id, email e cargo do usuario
	const body={
		id: user.id,
		cargo: user.cargo,
		email: user.email
	};
 
	//cria o token jwt com os seguintes parametros:
	const token = jwt.sign({user: body}, //objeto para ser colocado no payload, definido acima
		process.env.SECRET_KEY, //chave secreta para criptografia
		{expiresIn: process.env.JWT_EXPIRATION}); //data de expiracao do token
	
	//envia o cookie ao usuario com o nome 'jwt', e as opcoes de seguranca definidas
	res.cookie('jwt', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'development'
	});

	res.status(201).send('Usuario logado com sucesso!');

}

async function loginMiddleware(req, res, next){
	try {
		const user=Usuario.findOne({where: {email: req.body.email}});
		if(!user){
			throw new NotAuthorizedError('Email e/ou senha incorretos!');
		} else{
			const senhasIguais=await bcrypt.compare(req.body.senha, user.senha);
			if(!senhasIguais){
				throw new NotAuthorizedError('Email e/ou senha incorretos!');
			}
		}

		generateJWT(user, res);

	} catch (error) {
		next(error);
	}
}

async function notLoggedIn(){
	const token=req.cookies['jwt'];
	if(token){
		throw new NotAuthorizedError('Voce ja esta logado no sistema!');
	}else{
		next();
	}
}

module.exports={authMiddleware, notLoggedIn, loginMiddleware};