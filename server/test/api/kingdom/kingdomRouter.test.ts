import request from 'supertest';
import sinon from 'sinon';
import { Express } from 'express';
import jwt from 'jsonwebtoken';

import { createApp } from '../../../src/app';
import { env } from '../../../src/env';
import { kingdomService } from '../../../src/api';
import { testKingdom } from '../../testUtils';

describe('kingdomRouter', () => {
	let app: Express;
	let token: string;
	const sandbox = sinon.createSandbox();

	beforeAll(() => {
		app = createApp();
		token = jwt.sign('userName', env.secretKey);
	});
	afterEach(() => sandbox.restore());

	describe('GET /', () => {
		it('should return 200 and a kingdom object with an existing id', (done) => {
			sandbox.stub(kingdomService, 'getKingdom').resolves(testKingdom);

			request(app)
				.get('/api/kingdom?id=1')
				.set('Cookie', `accessToken=${token}`)
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).toMatchObject({ status: 200, data: testKingdom });
					done();
				});
		});

		it('should return 404 when the kingdoms id doesnt exist in the db', (done) => {
			sandbox.stub(kingdomService, 'getKingdom').resolves(undefined);

			request(app)
				.get('/api/kingdom?id=0')
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
				.get('/api/kingdom?id=0')
				.expect('Content-Type', /text\/plain/)
				.expect(401)
				.end(() => done());
		});

		it('should return 400 for missing id', (done) => {
			const expectedResBody = {
				ok: false,
				status: 400,
				error: [
					{
						keyword: 'required',
						instancePath: '/query',
						schemaPath: '#/properties/query/required',
						params: {
							missingProperty: 'id',
						},
						message: "must have required property 'id'",
					},
				],
			};

			request(app)
				.get('/api/kingdom')
				.set('Cookie', `accessToken=${token}`)
				.expect('Content-Type', /json/)
				.expect(400)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).toMatchObject(expectedResBody);
					done();
				});
		});

		it('should return 400 for a non-number id', (done) => {
			const expectedResBody = {
				ok: false,
				status: 400,
				error: [
					{
						keyword: 'type',
						instancePath: '/query/id',
						schemaPath: '#/properties/query/properties/id/type',
						params: {
							type: 'number',
						},
						message: 'must be number',
					},
				],
			};

			request(app)
				.get('/api/kingdom?id=string')
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
				.get('/api/kingdom?id=1&illegalParameter=true')
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

	describe('PATCH /:id', () => {
		it('should return 200 with an existing kingdom id', (done) => {
			sandbox.stub(kingdomService, 'updateKingdom').resolves(true);

			request(app)
				.patch('/api/kingdom/1')
				.set('Cookie', `accessToken=${token}`)
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).toMatchObject({
						status: 200,
					});
					done();
				});
		});

		it('should return 404 when the kingdom id doesnt exist in the db', (done) => {
			sandbox.stub(kingdomService, 'updateKingdom').resolves(false);

			request(app)
				.patch('/api/kingdom/-1')
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
				.patch('/api/kingdom/1')
				.expect('Content-Type', /text\/plain/)
				.expect(401)
				.end(() => done());
		});

		it('should return 400 for a non-number kingdom id', (done) => {
			const expectedResBody = {
				ok: false,
				status: 400,
				error: [
					{
						keyword: 'type',
						instancePath: '/params/id',
						schemaPath: '#/properties/params/properties/id/type',
						params: {
							type: 'number',
						},
						message: 'must be number',
					},
				],
			};

			request(app)
				.patch('/api/kingdom/string')
				.set('Cookie', `accessToken=${token}`)
				.expect('Content-Type', /json/)
				.expect(400)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).toMatchObject(expectedResBody);
					done();
				});
		});

		it('should return 400 for a not allowed body property', (done) => {
			const expectedResBody = {
				ok: false,
				status: 400,
				error: [
					{
						keyword: 'additionalProperties',
						instancePath: '/body',
						schemaPath: '#/properties/body/additionalProperties',
						message: 'must NOT have additional properties',
					},
				],
			};

			request(app)
				.patch('/api/kingdom/1')
				.set('Cookie', `accessToken=${token}`)
				.send({ badProperty: true })
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
