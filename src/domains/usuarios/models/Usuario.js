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




module.exports = Usuario;