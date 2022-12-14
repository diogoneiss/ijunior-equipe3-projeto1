const request = require('supertest');
const app = require('../config/expressConfig');
const supertest = require('supertest');


let musicaRouter = '/api/musica';

describe('Musica related tests', () => {
	test('GET / without auth', (done) => {
		request(app)
			.get(musicaRouter)
			.expect('Content-Type', /json/)
			.expect(403)
			.end((err, res) => {
				if (err) return done(err);
				return done();
			});
	});
	
	test('GET / with auth', (done) => {

		request(app)
			.get(musicaRouter)
			.set('Cookie', [`jwt=${sampleAdmin.jwt}`])
			.expect('Content-Type', /json/)
			.expect(200)
			.expect((res) => {
				res.body.length >= 1;
			})
			.end((err, res) => {
				if (err) return done(err);
				return done();
			});
	});

	test('POST / with auth', (done) => {

		let newMusica = {
			titulo: 'teste', 
			foto: 'deveria ser base64',
			categoria: 'teste',
			ArtistaID: 1,
		};

		
		request(app)
			.post(musicaRouter)
			.send(newMusica)
			.set('Cookie', [`jwt=${sampleAdmin.jwt}`])
			.expect('Content-Type', /json/)
			.expect(201)
			.expect((res) => {
				expect(res.body).toBe('Musica adicionada com sucesso!');
			})
			.end((err, res) => {
				if (err) return done(err);
				return done();
			});
	});


});