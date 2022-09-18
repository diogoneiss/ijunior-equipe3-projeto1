const Artista = require('../models/Artista');

class ArtistaService {
	async getArtista(id) {
		return await Artista.findByPk(id);
	}
}

module.exports = ArtistaService;