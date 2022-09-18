const Musica = require('../models/Musica');

class MusicaService{
	async criacao(musica){
		await Musica.create(musica);
	}
}

module.exports=new MusicaService();