import request from 'supertest';
import sinon from 'sinon';
import { Express } from 'express';
import jwt from 'jsonwebtoken';

import { createApp } from '../../../src/app';
import { env } from '../../../src/env';
import { userService } from '../../../src/api';

describe('userRouter', () => {
	let app: Express;
	const sandbox = sinon.createSandbox();

	beforeAll(() => (app = createApp()));
	afterEach(() => sandbox.restore());

	describe('POST /register', () => {
		it('should return 201 and success message in response body when registration is success', (done) => {
			sandbox.stub(userService, 'register').resolves(true);

			request(app)
				.post('/api/register')
				.send({ username: 'test', password: 'password1' })
				.expect('Content-Type', /json/)
				.expect(201)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body.message).toEqual('User registration success.');
					done();
				});
		});

		it('should return 409 and failure message in response body when username already exists', (done) => {
			sandbox.stub(userService, 'register').resolves(false);

			request(app)
				.post('/api/register')
				.send({ username: 'test', password: 'password1' })
				.expect('Content-Type', /json/)
				.expect(409)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body.message).toEqual('Username already exists.');
					done();
				});
		});

		it('should return 400 for missing username', (done) => {
			const expectedResBody = {
				ok: false,
				status: 400,
				error: [
					{
						keyword: 'required',
						instancePath: '/body',
						schemaPath: '#/properties/body/required',
						params: {
							missingProperty: 'username',
						},
						message: "must have required property 'username'",
					},
				],
			};

			request(app)
				.post('/api/register')
				.send({ password: 'password1' })
				.expect('Content-Type', /json/)
				.expect(400)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).toMatchObject(expectedResBody);
					done();
				});
		});

		it('should return 400 for illegal parameters', (done) => {
			const expectedResBody = {
				ok: false,
				status: 400,
				error: [
					{
						keyword: 'additionalProperties',
						instancePath: '/body',
						schemaPath: '#/properties/body/additionalProperties',
						params: {
							additionalProperty: 'illegalParameter',
						},
						message: 'must NOT have additional properties',
					},
				],
			};

			request(app)
				.post('/api/register')
				.send({
					username: 'test',
					password: 'password1',
					illegalParameter: true,
				})
				.expect('Content-Type', /json/)
				.expect(400)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).toMatchObject(expectedResBody);
					done();
				});
		});
	});

	describe('POST /login', () => {
		it('should return 200 and return a token cookie when login is success', (done) => {
			const tokenString = 'tokenString';

			sandbox.stub(userService, 'login').resolves(tokenString);

			request(app)
				.post('/api/login')
				.send({ username: 'test', password: 'password1' })
				.expect('Set-Cookie', `token=${tokenString}; Path=/; HttpOnly; Secure`)
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).toEqual({});
					done();
				});
		});

		it('should return 401 and failure message in response body when username/password doesnt match', (done) => {
			sandbox.stub(userService, 'login').resolves(undefined);

			request(app)
				.post('/api/login')
				.send({ username: 'badUsername', password: 'password1' })
				.expect('Content-Type', /json/)
				.expect(401)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body.message).toEqual(
						'Username/password combination incorrect.'
					);
					done();
				});
		});

		it('should return 400 for missing username', (done) => {
			const expectedResBody = {
				ok: false,
				status: 400,
				error: [
					{
						keyword: 'required',
						instancePath: '/body',
						schemaPath: '#/properties/body/required',
						params: {
							missingProperty: 'username',
						},
						message: "must have required property 'username'",
					},
				],
			};

			request(app)
				.post('/api/login')
				.send({ password: 'password1' })
				.expect('Content-Type', /json/)
				.expect(400)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).toMatchObject(expectedResBody);
					done();
				});
		});

		it('should return 400 for illegal parameters', (done) => {
			const expectedResBody = {
				ok: false,
				status: 400,
				error: [
					{
						keyword: 'additionalProperties',
						instancePath: '/body',
						schemaPath: '#/properties/body/additionalProperties',
						params: {
							additionalProperty: 'illegalParameter',
						},
						message: 'must NOT have additional properties',
					},
				],
			};

			request(app)
				.post('/api/login')
				.send({
					username: 'test',
					password: 'password1',
					illegalParameter: true,
				})
				.expect('Content-Type', /json/)
				.expect(400)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).toMatchObject(expectedResBody);
					done();
				});
		});
	});

	describe('GET /checkToken', () => {
		it('should return 200 and return a token cookie when login is success', (done) => {
			const token = jwt.sign('userName', env.secretKey);

			request(app)
				.get('/api/checkToken')
				.set('Cookie', [`token=${token}`])
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).toEqual({});
					done();
				});
		});

		it('should return 401 and failure message when token cookie isnt provided', (done) => {
			request(app)
				.get('/api/checkToken')
				.expect('Content-Type', /text\/html/)
				.expect(401)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.text).toEqual('Unauthorized: No token provided.');
					done();
				});
		});

		it('should return 401 and failure message when token cookie is incorrect', (done) => {
			request(app)
				.get('/api/checkToken')
				.set('Cookie', ['token=badToken; Path=/; HttpOnly; Domain=localhost'])
				.expect('Content-Type', /text\/html/)
				.expect(401)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.text).toEqual('Unauthorized: Invalid token.');
					done();
				});
		});
	});
});
