const sequelize = require('../../../../database/index');
const { DataTypes } = require('sequelize');

const Artista = sequelize.define('Artista', {
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
	nacionalidade: {
		type: DataTypes.STRING,
		allowNull: true
	},
	foto: {
		type: DataTypes.STRING,
		allowNull: true
	}
});




module.exports = Artista;