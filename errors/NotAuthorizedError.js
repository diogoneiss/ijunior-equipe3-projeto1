class NotAuthorizedError extends error{
    constructor(msg){
        super(msg);
        this.name='notAuthorizedError';
    }
}

module.exports=NotAuthorizedError;