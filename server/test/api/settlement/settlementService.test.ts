import { connection, populateDatabase } from '../../testUtils';
import { Settlement, settlementService } from '../../../src/api';

describe('settlementService', () => {
	beforeEach(async () => {
		await connection.create();
		await populateDatabase();
	});
	afterEach(async () => await connection.close());

	describe('getAllSettlements', () => {
		it('should return an array of Settlements when an existing kingdomId is passed in', async () => {
			const settlements = await settlementService.getAllSettlements(1);

			expect(settlements.length).toBe(2);
		});

		it('should return an empty array when a nonexistent kingdomId is passed in', async () => {
			const settlements = await settlementService.getAllSettlements(-1);

			expect(settlements.length).toBe(0);
		});
	});

	describe('createSettlement', () => {
		it('should return a newly created Settlement when an existing kingdomId and hexId is passed in', async () => {
			const settlement = await settlementService.createSettlement(1, 3);

			expect(settlement).not.toBeUndefined();
			expect(settlement!.name).toBe('New Settlement');
			expect(settlement!.government).toBe('Autocracy');
		});

		it('should return undefined when a nonexistent kingdomId is passed in', async () => {
			const settlement = await settlementService.createSettlement(-1, 3);

			expect(settlement).toBeUndefined();
		});

		it('should return undefined when a nonexistent hexId is passed in', async () => {
			const settlement = await settlementService.createSettlement(1, -1);

			expect(settlement).toBeUndefined();
		});
	});

	describe('updateSettlement', () => {
		it('should return true when an existing settlement id and an updated fields object are passed in', async () => {
			const updateOptions: Partial<Settlement> = {
				name: 'Replaced',
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
				wallUnrestUsed: true,
				moatUnrestUsed: true,
				government: 'Autocracy',
			};

			const success = await settlementService.updateSettlement(
				1,
				updateOptions
			);

			expect(success).toBe(true);
		});

		it('should return true when the updated fields object is empty', async () => {
			const success = await settlementService.updateSettlement(1, {});

			expect(success).toBe(true);
		});

		it('should return false when the hex id doesnt exist in the database', async () => {
			const success = await settlementService.updateSettlement(-1, {});

			expect(success).toBe(false);
		});
	});
});
