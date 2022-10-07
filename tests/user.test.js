const request = require('supertest');

const app = require('../config/expressConfig');
const supertest = require('supertest');

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
	/*
	test('GET / with auth', (done) => {
		request(app)
			.get(userRoute)
			.expect('Content-Type', /json/)
			.expect(200)
			.expect((res) => {
				res.body.data.length = 1;
				res.body.data[0].email = 'test@example.com';
			})
			.end((err, res) => {
				if (err) return done(err);
				return done();
			});
	});
*/

});