const request = require('supertest');

const app = require('../config/expressConfig');
const supertest = require('supertest');

//import jest globals

const {defaults} = require('jest-config');
const { user } = require('../src/domains/usuarios/constants/userRoles');

let userRoute = '/api/usuarios';

describe('User related tests', () => {
	test('GET / without auth', (done) => {
		request(app)
			.get(userRoute)
			.expect('Content-Type', /json/)
			.expect(403)
			.end((err, res) => {
				if (err) return done(err);
				return done();
			});
	});
	
	test('GET / with auth', (done) => {

		request(app)
			.get(userRoute)
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
	
	test('POST / for admin user with auth and no secret', (done) => {

		const user = {
			nome: 'Diogo',
			senha: '123456',
			email: 'diogo@teste1.com',
			cargo: 'admin'
		};

		request(app)
			.post(userRoute)
			.send(user)
			.expect(403)
			.end((err, res) => {
				if (err) return done(err);
				return done();
			});
	});
	test('POST / for admin user with auth and valid secret', (done) => {

		const user = {
			nome: 'Diogo',
			senha: '123456',
			email: 'diogo@teste2.com',
			cargo: 'admin',
			senhaAcessoTotal: 123456
		};

		request(app)
			.post(userRoute)
			.send(user)
			.expect(201)
			.end((err, res) => {
				if (err) return done(err);
				return done();
			});
	});
	test('POST / for regular user with auth and no secret', (done) => {

		const user = {
			nome: 'Diogo',
			senha: '123456',
			email: 'diogo@teste3.com',
			cargo: 'user'
		};

		request(app)
			.post(userRoute)
			.send(user)
			.expect(201)
			.end((err, res) => {
				if (err) return done(err);
				return done();
			});
	});
	test('POST /login', (done) => {

		const user = {
			
			'senha': '123456',
			'email': 'diogo@teste3.com'
		
		};

		request(app)
			.post(userRoute+'/login')
			.send(user)
			.expect(200)
			.expect((res) => {
				expect(res.headers['set-cookie']).toBeDefined();
			})
			.end((err, res) => {
				if (err) return done(err);
				return done();
			});
	});

	test('teardown com DELETE /:id', async () => {
		jest.setTimeout(20000);
		let emails = ['diogo@teste1.com', 'diogo@teste2.com', 'diogo@teste3.com'];

		// fase 1: recuperar os ids
		const idRequest = await request(app)
			.get(userRoute+'/')
			.set('Cookie', [`jwt=${sampleAdmin.jwt}`]);

		expect(idRequest.status).toBe(200);		
			
		let dados = JSON.parse(idRequest.text);
			
		//filtra pela lista de emails e pega os ids
		const ids = dados.filter((user) => emails.includes(user.email)).map((user) => user.id);


		// fase 2: deletar os ids
		ids.forEach(async (id) => {
			let ret = await request(app)
				.delete(userRoute+'/'+id)
				.set('Cookie', [`jwt=${sampleAdmin.jwt}`]);
			expect(ret.status).toBe(204);
		});
	});


});