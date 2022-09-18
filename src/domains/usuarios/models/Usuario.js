const sequelize = require('../../../../database/index');
const { DataTypes } = require('sequelize');


const Usuario = sequelize.define('Usuario', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	nome: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false
	},
	senha: {
		type: DataTypes.STRING,
		allowNull: false
	},
	cargo: {
		type: DataTypes.STRING,
	}

});



Usuario.sync({ alter: true, force: false }).then(() => {
	console.log('tabela de usuarios foi (re)criada');
})
	.catch((error) => {
		console.log(error);
	});

module.exports = Usuario;