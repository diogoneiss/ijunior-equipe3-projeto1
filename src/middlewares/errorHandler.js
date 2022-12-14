const NotAuthorizedError=require('../../errors/NotAuthorizedError');
const InvalidParametersError=require('../../errors/InvalidParametersError');
const InvalidRouteError=require('../../errors/InvalidRouteError');


function errorHandler(error,req,res,next){
	let code=500;
	let message=error.message;
	if(error instanceof NotAuthorizedError){
		code=403;
	}
	if(error instanceof InvalidParametersError){
		code=400;
	}
	if(error instanceof InvalidRouteError){
		code=404;
	}
	res.status(code).json(message);

}


module.exports=errorHandler;