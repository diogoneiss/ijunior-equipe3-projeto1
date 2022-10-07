
generateJWT = require('../src/middlewares/authMiddlewares').generateJWT;


sampleAdmin = {
	name: 'Admin John Doe',
	email: 'test@test,.com',
	cargo: 'admin'
};


sampleAdmin = {
	name: 'Regular John Doe',
	email: 'test2@test,.com',
	cargo: 'admin'
};


module.exports = async () => {
	return {
		verbose: true,
		globals: {
			__DEV__: true,
			sampleAdmin: sampleAdmin,
			sampleRegular: sampleRegular
		},
	};
};