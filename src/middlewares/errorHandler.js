function errorHandler(error,req,res,next){
	if(error.message=='O usuario selecionado nao existe'){
		res.status(404).json({error: error.message});
	}else{
        res.sendStatus(500);
    }

}


module.exports=errorHandler;