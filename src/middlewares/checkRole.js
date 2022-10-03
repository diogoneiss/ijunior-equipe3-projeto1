const NotAuthorizedError = require('../../errors/NotAuthorizedError');
const userRoles=require('../domains/usuarios/constants/userRoles');


function checkRole (req,res,next){
	console.log(req.user);

	if(req.user.cargo!=userRoles.admin){
		throw new NotAuthorizedError('Voce nao tem permissao para acessar esse recurso');
	}
	else{
		console.log('user é pode acessar!!!');
	}
	next();
}

module.exports=checkRole;