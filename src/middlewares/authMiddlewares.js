// TODO: Criar middleware que verifica o jwt e retorna seu tipo de usuário
// decodar jwt -> verificar se é admin ou user -> seguir para next se valido
const jwt = require('jsonwebtoken');
const bcrypt= require('bcrypt');
const NotAuthorizedError = require('../../errors/NotAuthorizedError');
const Usuario = require('../domains/usuarios/models/Usuario');
const userRoles=require('../domains/usuarios/constants/userRoles');


function authMiddleware (req,res,next){
	try {
		//extrai o cookie da requisicao e o salva em token
		const cookieExtractor = (req) => {
			if(req){
				return req.cookies['jwt'];
			}
		};

		const token=cookieExtractor(req);

		//caso haja o cookie, salvar suas informacoes na requisicao e next()
		if(token){
			const decoded=jwt.verify(token, process.env.SECRET_KEY);
			req.user = decoded.user;
		};

		//caso nao haja o cookie, o usuario nao esta logado no sistema
		if(!req.user){
			throw new NotAuthorizedError('Voce precisa estar logado para realizar essa acao!');
		}
		next();

	} catch (error) {
		next(error);
	}
}

async function loginMiddleware(req, res, next){
	try {
		const user= await Usuario.findOne({where: {email: req.body.email}});
		if(!user){
			throw new NotAuthorizedError('Email e/ou senha incorretos!');
		} else{
			const comparaSenha = await bcrypt.compare(req.body.senha, user.senha);
			if(!comparaSenha){
				throw new NotAuthorizedError('Email e/ou senha incorretos!');
			}
			generateJWT(user, res);
		};
		
	
		next();

	} catch (error) {
		next(error);
	}
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

async function notLoggedIn(req, res, next){
	const token=req.cookies['jwt'];
	try{
		if(token){
			throw new NotAuthorizedError('Voce ja esta logado no sistema!');
		}
		next();
	}catch(error){
		next(error);
	}
}

async function logoutMiddleware(req, res, next){
	const token=req.cookies['jwt'];
	try {
		if(!token){
			throw new NotAuthorizedError('Voce nao esta logado no sistema!');
		}
		res.status(202).clearCookie('jwt').send('logout bem sucedido!');

	} catch (error) {
		next(error);
	}
}

function checkRole (req,res,next){
	if(req.user.cargo!=userRoles.admin){
		throw new NotAuthorizedError('Voce nao tem permissao para acessar esse recurso');
	}
	else{
		console.log('user pode acessar!!!');
	}
	next();
}


module.exports={authMiddleware, notLoggedIn, loginMiddleware, logoutMiddleware, checkRole};