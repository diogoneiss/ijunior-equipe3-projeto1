const Musica = require('../models/Musica');
const InvalidParametersError = require('../../../../errors/InvalidParametersError');

class MusicaService {


	async criacao(musica) {
		await Musica.create(musica);
	}

	async listaTodos() {
		return await Musica.findAll();
	}

	async alteracao(update, id) {
		const musicaOriginal = await Musica.findByPk(id);
		//checa se a key enviada existe
		if (musicaOriginal === null) {
			throw new InvalidParametersError(`A musica com a id ${id} nao existe`);
		}

		//atualiza os campos do usuario selecionado e os salva
		musicaOriginal.foto = update?.foto || musicaOriginal?.foto || '';
		musicaOriginal.titulo = update?.titulo || musicaOriginal?.titulo || '';
		musicaOriginal.categoria = update?.categoria || musicaOriginal?.categoria || '';
		musicaOriginal.ArtistaID = update?.ArtistaID || musicaOriginal?.ArtistaID || 0;

		await musicaOriginal.save();
	}

	//deleta um usuario com base na sua PK
	async delecao(id) {
		const musica = await Musica.findByPk(id);
		//checa se a key enviada existe
		if (musica === null) {
			throw new InvalidParametersError(`A musica com a id ${id} nao existe`);
		}
		await musica.destroy();
	}

}

module.exports = new MusicaService();