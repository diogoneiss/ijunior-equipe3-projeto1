const request = require('supertest');
const app = require('../config/expressConfig');
const supertest = require('supertest');


let artistaRota = '/api/artistas';

describe('Artistas related tests', () => {
	test('GET / without auth should be allowed', (done) => {
		request(app)
			.get(artistaRota)
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);
				return done();
			});
	});
	
	test('GET / with auth', (done) => {

		request(app)
			.get(artistaRota)
			.set('Cookie', [`jwt=${sampleAdmin.jwt}`])
			.expect('Content-Type', /json/)
			.expect(200)
			.expect((res) => {
				expect(res.body.length).toBeGreaterThanOrEqual(1);
			})
			.end((err, res) => {
				if (err) return done(err);
				return done();
			});
	});

	test('POST / with auth', (done) => {

		let newArtista = {
			nome: 'teste', 
			foto: 'deveria ser base64',
			nacionalidade: 'teste'
		};

		request(app)
			.post(artistaRota)
			.set('Cookie', [`jwt=${sampleAdmin.jwt}`])
			.send(newArtista)
			.expect('Content-Type', /text/)
			.expect((res) => {
				expect(res.text).toBe('Artista criado com sucesso!');
			})
			.end((err, res) => {
				if (err) return done(err);
				return done();
			});
	});


});