const NotAuthorizedError = require('../../errors/NotAuthorizedError');
const userRoles=require('../domains/usuarios/constants/userRoles');


function checkRole (req,res,next){
	if(req.user.cargo!=userRoles.admin){
		throw new NotAuthorizedError('Voce nao tem permissao para acessar esse recurso');
	}
	next();
}

module.exports=checkRole;