import request from 'supertest';
import sinon from 'sinon';
import { Express } from 'express';

import { createApp } from '../../../src/app';
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
				.post('/api/user/register')
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
				.post('/api/user/register')
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
				.post('/api/user/register')
				.send({ password: 'password1' })
				.expect('Content-Type', /json/)
				.expect(400)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).toMatchObject(expectedResBody);
					done();
				});
		});

		it('should return 400 for missing password', (done) => {
			const expectedResBody = {
				ok: false,
				status: 400,
				error: [
					{
						keyword: 'required',
						instancePath: '/body',
						schemaPath: '#/properties/body/required',
						params: {
							missingProperty: 'password',
						},
						message: "must have required property 'password'",
					},
				],
			};

			request(app)
				.post('/api/user/register')
				.send({ username: 'test' })
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
				.post('/api/user/register')
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
			const fakeToken = {
				accessToken: 'accessToken',
				accessTokenExpiration: new Date(),
			};

			sandbox.stub(userService, 'login').resolves(fakeToken);

			request(app)
				.post('/api/user/login')
				.send({ username: 'test', password: 'password1' })
				.expect(
					'Set-Cookie',
					`accessToken=${
						fakeToken.accessToken
					}; Path=/; Expires=${fakeToken.accessTokenExpiration.toUTCString()}; HttpOnly; SameSite=Strict`
				)
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).toEqual({
						expires: fakeToken.accessTokenExpiration.toUTCString(),
					});
					done();
				});
		});

		it('should return 401 and failure message in response body when username/password doesnt match', (done) => {
			sandbox.stub(userService, 'login').resolves(undefined);

			request(app)
				.post('/api/user/login')
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
				.post('/api/user/login')
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
				.post('/api/user/login')
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
});
