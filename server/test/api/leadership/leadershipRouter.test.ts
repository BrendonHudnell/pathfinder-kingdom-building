import request from 'supertest';
import sinon from 'sinon';
import { Express } from 'express';
import jwt from 'jsonwebtoken';

import { createApp } from '../../../src/app';
import { env } from '../../../src/env';
import { leadershipService } from '../../../src/api';
import { testRole, testViceroy } from '../../testUtils';

describe('leadershipRouter', () => {
	let app: Express;
	let token: string;
	const sandbox = sinon.createSandbox();

	beforeAll(() => {
		app = createApp();
		token = jwt.sign('userName', env.secretKey);
	});
	afterEach(() => sandbox.restore());

	describe('GET /', () => {
		it('should return 200 and a leadershipRole array with an existing kingdomId', (done) => {
			sandbox
				.stub(leadershipService, 'getAllLeadershipRoles')
				.resolves([testRole]);

			request(app)
				.get('/api/leadership?kingdomId=1')
				.set('Cookie', `accessToken=${token}`)
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).toMatchObject({ status: 200, data: [testRole] });
					done();
				});
		});

		it('should return 404 when the kingdomId doesnt exist in the db', (done) => {
			sandbox.stub(leadershipService, 'getAllLeadershipRoles').resolves([]);

			request(app)
				.get('/api/leadership?kingdomId=0')
				.set('Cookie', `accessToken=${token}`)
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).toMatchObject({ status: 404 });
					done();
				});
		});

		it('should return 401 when missing auth token', (done) => {
			request(app)
				.get('/api/leadership?kingdomId=0')
				.expect('Content-Type', /text\/plain/)
				.expect(401)
				.end(() => done());
		});

		it('should return 400 for missing kingdomId', (done) => {
			const expectedResBody = {
				ok: false,
				status: 400,
				error: [
					{
						keyword: 'required',
						instancePath: '/query',
						schemaPath: '#/properties/query/required',
						params: {
							missingProperty: 'kingdomId',
						},
						message: "must have required property 'kingdomId'",
					},
				],
			};

			request(app)
				.get('/api/leadership')
				.set('Cookie', `accessToken=${token}`)
				.expect('Content-Type', /json/)
				.expect(400)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).toMatchObject(expectedResBody);
					done();
				});
		});

		it('should return 400 for a non-number kingdomId', (done) => {
			const expectedResBody = {
				ok: false,
				status: 400,
				error: [
					{
						keyword: 'type',
						instancePath: '/query/kingdomId',
						schemaPath: '#/properties/query/properties/kingdomId/type',
						params: {
							type: 'number',
						},
						message: 'must be number',
					},
				],
			};

			request(app)
				.get('/api/leadership?kingdomId=string')
				.set('Cookie', `accessToken=${token}`)
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
						instancePath: '/query',
						schemaPath: '#/properties/query/additionalProperties',
						params: {
							additionalProperty: 'illegalParameter',
						},
						message: 'must NOT have additional properties',
					},
				],
			};

			request(app)
				.get('/api/leadership?kingdomId=1&illegalParameter=true')
				.set('Cookie', `accessToken=${token}`)
				.expect('Content-Type', /json/)
				.expect(400)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).toMatchObject(expectedResBody);
					done();
				});
		});
	});

	describe('POST /createViceroy', () => {
		it('should return 200 and the created LeadershipRole with an existing kingdomId', (done) => {
			sandbox.stub(leadershipService, 'createViceroy').resolves(testViceroy);

			request(app)
				.post('/api/leadership/createViceroy')
				.set('Cookie', `accessToken=${token}`)
				.send({ kingdomId: 1 })
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).toMatchObject({
						status: 200,
						data: testViceroy,
					});
					done();
				});
		});

		it('should return 404 when the kingdomId doesnt exist in the db', (done) => {
			sandbox.stub(leadershipService, 'createViceroy').resolves(undefined);

			request(app)
				.post('/api/leadership/createViceroy')
				.set('Cookie', `accessToken=${token}`)
				.send({ kingdomId: -1 })
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).toMatchObject({ status: 404 });
					done();
				});
		});

		it('should return 401 when missing auth token', (done) => {
			request(app)
				.post('/api/leadership/createViceroy')
				.send({ kingdomId: 1 })
				.expect('Content-Type', /text\/plain/)
				.expect(401)
				.end(() => done());
		});

		it('should return 400 for missing kingdomId', (done) => {
			const expectedResBody = {
				ok: false,
				status: 400,
				error: [
					{
						keyword: 'required',
						instancePath: '/body',
						schemaPath: '#/properties/body/required',
						params: {
							missingProperty: 'kingdomId',
						},
						message: "must have required property 'kingdomId'",
					},
				],
			};

			request(app)
				.post('/api/leadership/createViceroy')
				.set('Cookie', `accessToken=${token}`)
				.expect('Content-Type', /json/)
				.expect(400)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).toMatchObject(expectedResBody);
					done();
				});
		});

		it('should return 400 for a non-number kingdomId', (done) => {
			const expectedResBody = {
				ok: false,
				status: 400,
				error: [
					{
						keyword: 'type',
						instancePath: '/body/kingdomId',
						schemaPath: '#/properties/body/properties/kingdomId/type',
						params: {
							type: 'number',
						},
						message: 'must be number',
					},
				],
			};

			request(app)
				.post('/api/leadership/createViceroy')
				.set('Cookie', `accessToken=${token}`)
				.send({ kingdomId: 'string' })
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
				.post('/api/leadership/createViceroy')
				.set('Cookie', `accessToken=${token}`)
				.send({ kingdomId: 1, illegalParameter: true })
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
