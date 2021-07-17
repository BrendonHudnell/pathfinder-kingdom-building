import request from 'supertest';
import sinon from 'sinon';
import { Express } from 'express';

import { createApp } from '../../../src/app';
import {
	LeadershipRole,
	leadershipService,
} from '../../../src/modules/leadership';

describe('leadershipRouter', () => {
	let app: Express;
	const sandbox = sinon.createSandbox();

	const testRole: LeadershipRole = {
		id: 1,
		name: 'Ruler',
		heldBy: 'Ruler',
		attribute: 'Charisma',
		abilityBonus: 0,
		leadership: false,
		benefit: 'Economy',
		vacant: false,
		skillBonus: 0,
	};

	beforeAll(() => (app = createApp()));
	afterEach(() => sandbox.restore());

	describe('GET /', () => {
		it('should return 200 and a leadershipRole array with an existing kingdomId', (done) => {
			sandbox
				.stub(leadershipService, 'getAllLeadershipRoles')
				.resolves([testRole]);

			request(app)
				.get('/api/leadership?kingdomId=1')
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body.length).toBe(1);
					done();
				});
		});

		it('should return 404 when the kingdomId doesnt exist in the db', (done) => {
			sandbox.stub(leadershipService, 'getAllLeadershipRoles').resolves([]);

			request(app)
				.get('/api/leadership?kingdomId=0')
				.expect('Content-Type', /text\/plain/)
				.expect(404)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.text).toEqual('Not Found');
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
				.get('/api/leadership')
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
