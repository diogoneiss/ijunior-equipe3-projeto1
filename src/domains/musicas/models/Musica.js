const sequelize = require('../../../../database/index');
const { DataTypes } = require('sequelize');
const Artista = require('../../artistas/models/Artista');


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

//todo linkar modelo e array

// Ex: listaDeMusicas[0].nome retorna o nome da primeira música
const listaDeMusicas = [
	{
		nome: 'Dark Necessities',
		artista: 'Red Hot Chili Peppers',
		genero: 'Rock',
		quantidadeDownloads: 15000,
	},
	{
		nome: 'Boate Azul',
		artista: 'Bruno & Marrone',
		genero: 'Sertanejo',
		quantidadeDownloads: 1000,
	},
	{
		nome: 'Power',
		artista: 'Kanye West',
		genero: 'Hip Hop',
		quantidadeDownloads: 12000,
	},
	{
		nome: 'Money',
		artista: 'Pink Floyd',
		genero: 'Rock',
		quantidadeDownloads: 140500,
	},
	{
		nome: 'Enemy',
		artista: 'Imagine Dragons x J.I.D',
		genero: 'Pop Rock',
		quantidadeDownloads: 18000,
	}
];

Musica.belongsTo(Artista, {
	constraint: true,
	foreignKey: 'ArtistaID',

});

Artista.hasMany(Musica,{
	foreignKey: 'ArtistaID'
});

Musica.sync({ force: false, alter: true }).then(() => {
	console.log('a tabela de musicas foi (re)criada');
})
	.catch((error) => {
		console.log(error);
	});

module.exports = Musica;