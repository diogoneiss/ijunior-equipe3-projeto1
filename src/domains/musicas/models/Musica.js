const sequelize = require('../../../../database/index');
const { DataTypes } = require('sequelize');
const Artista = require('../../artistas/models/Artista');
const Usuario = require('../../usuarios/models/Usuario');


const Musica = sequelize.define('Musica', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	foto: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	titulo: {
		type: DataTypes.STRING,
		allowNull: false
	},
	categoria: {
		type: DataTypes.STRING,
		allowNull: false
	},
	//artistaID
});


//relacionamento 1:N entre artista e musica
//uma musica tem UM artista e um artista tem N musicas
Musica.belongsTo(Artista, {
	constraint: true,
	foreignKey: 'ArtistaID',

});

Artista.hasMany(Musica,{
	foreignKey: 'ArtistaID'
});

Musica.belongsToMany(Usuario,{
	through: 'MusicaUsuario'
});

Usuario.belongsToMany(Musica,{
	through: 'MusicaUsuario'
});



module.exports = Musica;