const Usuario = require('../src/domains/usuarios/models/Usuario');
const Musica = require('../src/domains/musicas/models/Musica');
const Artista = require('../src/domains/artistas/models/Artista');



Musica.sync({ force: false, alter: true }).then(() => {
	console.log('a tabela de musicas foi (re)criada');
})
	.catch((error) => {
		console.log(error);
	});

Artista.sync({ force: false, alter: true }).then(() => {
	console.log('tabela de artistas foi (re)criada');
})
	.catch((error) => {
		console.log(error);
	});

Usuario.sync({ alter: true, force: false }).then(() => {
	console.log('tabela de usuarios foi (re)criada');
})
	.catch((error) => {
		console.log(error);
	});