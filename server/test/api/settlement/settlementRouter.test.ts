import request from 'supertest';
import sinon from 'sinon';
import { Express } from 'express';
import jwt from 'jsonwebtoken';

import { env } from '../../../src/env';
import { createApp } from '../../../src/app';
import { settlementService } from '../../../src/api';
import { testSettlement1, testSettlement2 } from '../../testUtils';

describe('settlementRouter', () => {
	let app: Express;
	let token: string;
	const sandbox = sinon.createSandbox();

	beforeAll(() => {
		app = createApp();
		token = jwt.sign('userName', env.secretKey);
	});
	afterEach(() => sandbox.restore());

	describe('GET /', () => {
		it('should return 200 and a list of settlements with an existing kingdomId', (done) => {
			sandbox
				.stub(settlementService, 'getAllSettlements')
				.resolves([testSettlement1, testSettlement2]);

			request(app)
				.get('/api/settlement?kingdomId=1')
				.set('Cookie', `accessToken=${token}`)
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).toMatchObject({
						status: 200,
						data: [testSettlement1, testSettlement2],
					});
					done();
				});
		});

		it('should return 404 when the kingdomId doesnt exist in the db', (done) => {
			sandbox.stub(settlementService, 'getAllSettlements').resolves([]);

			request(app)
				.get('/api/settlement?kingdomId=0')
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
				.get('/api/settlement?kingdomId=0')
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
				.get('/api/settlement')
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
				.get('/api/settlement?kingdomId=string')
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
				.get('/api/settlement?kingdomId=1&illegalParameter=true')
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

	describe('POST /add', () => {
		it('should return 200 and the created settlement with an existing kingdomId and hexId', (done) => {
			sandbox
				.stub(settlementService, 'addSettlement')
				.resolves(testSettlement1);

			request(app)
				.post('/api/settlement/add')
				.set('Cookie', `accessToken=${token}`)
				.send({ kingdomId: 1, hexId: 1 })
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).toMatchObject({
						status: 200,
						data: testSettlement1,
					});
					done();
				});
		});

		it('should return 404 when the kingdomId doesnt exist in the db', (done) => {
			sandbox.stub(settlementService, 'addSettlement').resolves(undefined);

			request(app)
				.post('/api/settlement/add')
				.set('Cookie', `accessToken=${token}`)
				.send({ kingdomId: -1, hexId: 1 })
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).toMatchObject({ status: 404 });
					done();
				});
		});

		it('should return 404 when the hexId doesnt exist in the db', (done) => {
			sandbox.stub(settlementService, 'addSettlement').resolves();

			request(app)
				.post('/api/settlement/add')
				.set('Cookie', `accessToken=${token}`)
				.send({ kingdomId: 1, hexId: -1 })
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
				.post('/api/settlement/add')
				.send({ kingdomId: 1, hexId: 1 })
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
				.post('/api/settlement/add')
				.set('Cookie', `accessToken=${token}`)
				.send({ hexId: 1 })
				.expect('Content-Type', /json/)
				.expect(400)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).toMatchObject(expectedResBody);
					done();
				});
		});

		it('should return 400 for missing hexId', (done) => {
			const expectedResBody = {
				ok: false,
				status: 400,
				error: [
					{
						keyword: 'required',
						instancePath: '/body',
						schemaPath: '#/properties/body/required',
						params: {
							missingProperty: 'hexId',
						},
						message: "must have required property 'hexId'",
					},
				],
			};

			request(app)
				.post('/api/settlement/add')
				.set('Cookie', `accessToken=${token}`)
				.send({ kingdomId: 1 })
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
				.post('/api/settlement/add')
				.set('Cookie', `accessToken=${token}`)
				.send({ kingdomId: 'string', hexId: 1 })
				.expect('Content-Type', /json/)
				.expect(400)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).toMatchObject(expectedResBody);
					done();
				});
		});

		it('should return 400 for a non-number hexId', (done) => {
			const expectedResBody = {
				ok: false,
				status: 400,
				error: [
					{
						keyword: 'type',
						instancePath: '/body/hexId',
						schemaPath: '#/properties/body/properties/hexId/type',
						params: {
							type: 'number',
						},
						message: 'must be number',
					},
				],
			};

			request(app)
				.post('/api/settlement/add')
				.set('Cookie', `accessToken=${token}`)
				.send({ kingdomId: 1, hexId: 'string' })
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
				.post('/api/settlement/add')
				.set('Cookie', `accessToken=${token}`)
				.send({ kingdomId: 1, hexId: 1, illegalParameter: true })
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
