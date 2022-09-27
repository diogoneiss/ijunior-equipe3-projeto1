const Artista = require('../models/Artista');

class ArtistaService {
	async getArtista(id) {
		return await Artista.findByPk(id);
	}
	async criacao(artista){
		await Artista.create(artista);
	}
	async listaTodos(){
		return await Artista.findAll();
	}
	//altera uma musica usando como chave principal a propria PK
	async alteracao(update, id){
		const artistaOriginal = await Artista.findByPk(id);
		//checa se a key enviada existe
		if (artistaOriginal === null) {
			return new Error('O artista enviado nao existe');
		}

		//atualiza os campos do artista selecionado e os salva
		artistaOriginal.nome=update?.nome || artistaOriginal?.nome|| '';
		artistaOriginal.nacionalidade= update?.nacionalidade || artistaOriginal?.nacionalidade || '';
		artistaOriginal.foto=update?.foto || artistaOriginal?.foto || '';

		await artistaOriginal.save();
	}
	async delecao(id){
		const artista = await Artista.findByPk(id);
		//checa se a key enviada existe
		if (artista === null) {
			return new Error('O artista selecionado nao existe');
		}
		await artista.destroy();
	}
}

module.exports = new ArtistaService();