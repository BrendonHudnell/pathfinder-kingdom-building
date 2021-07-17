import request from 'supertest';
import sinon from 'sinon';
import { Express } from 'express';

import { createApp } from '../../../src/app';
import { Settlement, settlementService } from '../../../src/modules/settlement';

describe('settlementRouter', () => {
	let app: Express;
	const sandbox = sinon.createSandbox();

	const testSettlement: Settlement = {
		id: 1,
		name: 'Hex 1',
		hexId: 1,
		districts: [],
		buildings: {
			Academy: 0,
			Alchemist: 0,
			Arena: 0,
			Bank: 0,
			'Bardic College': 0,
			Barracks: 0,
			'Black Market': 0,
			Brewery: 0,
			Bridge: 0,
			Bureau: 0,
			"Caster's Tower": 0,
			Castle: 0,
			Cathedral: 0,
			Cistern: 0,
			'City Wall': 0,
			'Dance Hall': 0,
			Dump: 0,
			'Everflowing Spring': 0,
			'Exotic Artisan': 0,
			'Foreign Quarter': 0,
			Foundry: 0,
			Garrison: 0,
			Granary: 0,
			Graveyard: 0,
			Guildhall: 0,
			Herbalist: 0,
			Hospital: 0,
			House: 0,
			Inn: 0,
			Jail: 0,
			Library: 0,
			'Luxury Store': 0,
			'Magic Shop': 0,
			'Magical Academy': 0,
			'Magical Streetlamps': 0,
			Mansion: 0,
			Market: 0,
			Menagerie: 0,
			'Military Academy': 0,
			Mill: 0,
			Mint: 0,
			Moat: 0,
			Monastery: 0,
			Monument: 0,
			Museum: 0,
			'Noble Villa': 0,
			Observatory: 0,
			Orphanage: 0,
			Palace: 0,
			Park: 0,
			'Paved Streets': 0,
			Pier: 0,
			'Sewer System': 0,
			Shop: 0,
			Shrine: 0,
			Smithy: 0,
			Stable: 0,
			Stockyard: 0,
			Tannery: 0,
			Tavern: 0,
			Temple: 0,
			Tenement: 0,
			Theater: 0,
			'Town Hall': 0,
			'Trade Shop': 0,
			University: 0,
			Watchtower: 0,
			Waterfront: 0,
			Waterway: 0,
		},
		wallUnrestUsed: false,
		moatUnrestUsed: false,
		government: 'Autocracy',
	};

	beforeAll(() => (app = createApp()));
	afterEach(() => sandbox.restore());

	describe('GET /', () => {
		it('should return 200 and a list of settlements with an existing kingdomId', (done) => {
			sandbox
				.stub(settlementService, 'getAllSettlements')
				.resolves([testSettlement]);

			request(app)
				.get('/api/settlement?kingdomId=1')
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body.length).toEqual(1);
					done();
				});
		});

		it('should return 404 when the kingdomId doesnt exist in the db', (done) => {
			sandbox.stub(settlementService, 'getAllSettlements').resolves([]);

			request(app)
				.get('/api/settlement?kingdomId=0')
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
				.get('/api/settlement')
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
