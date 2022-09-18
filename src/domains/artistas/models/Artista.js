const sequelize = require('../../../../database/index');
const { DataTypes } = require('sequelize');

const Artista = sequelize.define('Artista', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	name: {
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

Artista.sync({ force: false, alter: true }).then(() => {
	console.log('tabela de artistas foi (re)criada');
})
	.catch((error) => {
		console.log(error);
	});



module.exports = Artista;