
createJwt = require('./src/middlewares/authMiddlewares').createJwt;

//O correto seria ter um arquivo que configura essas variaveis de ambiente externamente e usar setupFiles,
//porem ja gastei tempo demais nisso
process.env.SECRET_KEY = 'teste';
process.env.JWT_EXPIRATION = '15d';
process.env.SENHA_ACESSO_TOTAL = '123456';

sampleAdmin = {
	id: '1',
	email: 'test@test.com',
	cargo: 'admin'
};


sampleRegular = {
	id: '1',
	email: 'test2@test.com',
	cargo: 'user'
};

sampleAdmin.jwt = createJwt(sampleAdmin.id, sampleAdmin.cargo, sampleAdmin.email);
sampleRegular.jwt = createJwt(sampleRegular.id, sampleRegular.cargo, sampleRegular.email);

module.exports =  {
	
	verbose: true,
	globals: {
		__DEV__: true,
		sampleAdmin: sampleAdmin,
		sampleRegular: sampleRegular
	},
	
};