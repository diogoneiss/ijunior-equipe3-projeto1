class NotAuthorizedError extends Error{
	constructor(msg){
		super(msg);

		this.name='notAuthorizedError';
	}
}

module.exports=NotAuthorizedError;