import request from 'supertest';
import sinon from 'sinon';
import { Express } from 'express';

import { createApp } from '../../../src/app';
import { districtService } from '../../../src/modules/district';
import { testDistrict1, testDistrict2 } from '../../testUtils';

describe('districtRouter', () => {
	let app: Express;
	const sandbox = sinon.createSandbox();

	beforeAll(() => (app = createApp()));
	afterEach(() => sandbox.restore());

	describe('GET /', () => {
		it('should return 200 and a list of districts with an existing kingdomId', (done) => {
			sandbox
				.stub(districtService, 'getAllDistricts')
				.resolves([testDistrict1, testDistrict2]);

			request(app)
				.get('/api/district?kingdomId=1')
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).toMatchObject({
						status: 200,
						data: [testDistrict1, testDistrict2],
					});
					done();
				});
		});

		it('should return 404 when the kingdomId doesnt exist in the db', (done) => {
			sandbox.stub(districtService, 'getAllDistricts').resolves([]);

			request(app)
				.get('/api/district?kingdomId=0')
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).toMatchObject({ status: 404 });
					done();
				});
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
				.get('/api/district')
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
				.get('/api/district?kingdomId=string')
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
				.get('/api/district?kingdomId=1&illegalParameter=true')
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
