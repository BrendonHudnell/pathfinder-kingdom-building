import request from 'supertest';
import sinon from 'sinon';
import { Express } from 'express';

import { createApp } from '../../../src/app';
import { Kingdom, kingdomService } from '../../../src/modules/kingdom';

describe('kingdomRouter', () => {
	let app: Express;
	const sandbox = sinon.createSandbox();

	const testKingdom: Kingdom = {
		id: 1,
		name: 'Kingdom 1',
		alignment: 'Neutral',
		month: 1,
		treasury: 0,
		unrest: 0,
		holidayEdict: 'None',
		promotionEdict: 'None',
		taxationEdict: 'None',
		fame: {
			1: {
				set: false,
				value: 'none',
			},
			11: {
				set: false,
				value: 'none',
			},
			26: {
				set: false,
				value: 'none',
			},
			51: {
				set: false,
				value: 'none',
			},
			101: {
				set: false,
				value: 'none',
			},
			201: {
				set: false,
				value: 'none',
			},
		},
		government: 'Feudal Monarchy',
		options: {
			settlementModifiers: false,
			settlementGovernment: false,
			kingdomModifiers: false,
			kingdomGovernment: false,
			kingdomFame: false,
			leadershipSkills: false,
		},
	};

	beforeAll(() => (app = createApp()));
	afterEach(() => sandbox.restore());

	describe('GET /', () => {
		it('should return 200 and a kingdom object with an existing id', (done) => {
			sandbox.stub(kingdomService, 'getKingdom').resolves(testKingdom);

			request(app)
				.get('/api/kingdom?id=1')
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).toMatchObject(testKingdom);
					done();
				});
		});

		it('should return 404 when the kingdoms id doesnt exist in the db', (done) => {
			sandbox.stub(kingdomService, 'getKingdom').resolves(undefined);

			request(app)
				.get('/api/kingdom?id=0')
				.expect('Content-Type', /text\/plain/)
				.expect(404)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.text).toEqual('Not Found');
					done();
				});
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
