class InvalidParametersError extends Error{
	constructor(msg){
		super(msg);
		this.name='InvalidParametersError';
	}
}

module.exports=InvalidParametersError;