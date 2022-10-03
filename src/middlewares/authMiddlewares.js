// TODO: Criar middleware que verifica o jwt e retorna seu tipo de usuário
// decodar jwt -> verificar se é admin ou user -> seguir para next se valido


const NotAuthorizedError = require('../../errors/NotAuthorizedError');
const checkRole=require('./checkRole');


function authMiddleware (req,res,next){
	//TODO: verificar se o token é valido

	// o ideal seria fazer tudo de auth aqui, sem o checkRole, mas como ele está na especificação vou deixar
	req.user={cargo:'admin'};
	checkRole(req,res,next);
}

module.exports=authMiddleware;