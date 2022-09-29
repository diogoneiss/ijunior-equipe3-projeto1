class InvalidParametersError extends error{
    constructor(msg){
        super(msg);
        this.name='InvalidParametersError';
    }
}

module.exports=InvalidParametersError;