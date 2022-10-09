const request = require('supertest');

const app = require('../config/expressConfig');
const supertest = require('supertest');

//import jest globals

const {defaults} = require('jest-config');

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
			.expect(201)
			.expect((res) => {
				res.body.length >= 1;
			})
			.end((err, res) => {
				if (err) return done(err);
				return done();
			});
	});


});