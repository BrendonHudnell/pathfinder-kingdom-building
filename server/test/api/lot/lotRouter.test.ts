import request from 'supertest';
import sinon from 'sinon';
import { Express } from 'express';
import jwt from 'jsonwebtoken';

import { env } from '../../../src/env';
import { createApp } from '../../../src/app';
import { lotService } from '../../../src/api';

describe('lotRouter', () => {
	let app: Express;
	let token: string;
	const sandbox = sinon.createSandbox();

	beforeAll(() => {
		app = createApp();
		token = jwt.sign('userName', env.secretKey);
	});
	afterEach(() => sandbox.restore());

	describe('PATCH /:id', () => {
		it('should return 200 with an existing lot id', (done) => {
			sandbox.stub(lotService, 'updateLot').resolves(true);

			request(app)
				.patch('/api/lot/1')
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

		it('should return 404 when the lot id doesnt exist in the db', (done) => {
			sandbox.stub(lotService, 'updateLot').resolves(false);

			request(app)
				.patch('/api/lot/-1')
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
				.patch('/api/lot/1')
				.expect('Content-Type', /text\/plain/)
				.expect(401)
				.end(() => done());
		});

		it('should return 400 for a non-number lot id', (done) => {
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
				.patch('/api/lot/string')
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
				.patch('/api/lot/1')
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
