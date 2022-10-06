const NotAuthorizedError = require('../../errors/NotAuthorizedError');
const userRoles=require('../domains/usuarios/constants/userRoles');


function checkRole (req,res,next){
	console.log(req.cookies['jwt']);

	if(req.user.cargo!=userRoles.admin){
		throw new NotAuthorizedError('Voce nao tem permissao para acessar esse recurso');
	}
	else{
		console.log('user pode acessar!!!');
	}
	next();
}

module.exports=checkRole;