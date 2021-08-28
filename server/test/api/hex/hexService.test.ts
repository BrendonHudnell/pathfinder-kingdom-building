import { connection, populateDatabase } from '../../testUtils';
import { hexService } from '../../../src/api';

describe('districtService', () => {
	beforeEach(async () => {
		await connection.create();
		await populateDatabase();
	});
	afterEach(async () => await connection.close());

	describe('getAllHexes', () => {
		it('should return an array of Hexes when an existing kingdomId is passed in', async () => {
			const hexes = await hexService.getAllHexes(1);

			expect(hexes.length).toBe(3);
		});

		it('should return an empty array when a nonexistent kingdomId is passed in', async () => {
			const hexes = await hexService.getAllHexes(-1);

			expect(hexes.length).toBe(0);
		});
	});

	describe('createHexBoard', () => {
		it('should return an array of newly created Hexes for the passed in KingdomEntity', async () => {
			const hexes = await hexService.createHexBoard(1);

			expect(hexes!.length).toBe(90);
		});

		it('should return an array of newly created Hexes for the passed in KingdomEntity', async () => {
			const hexes = await hexService.createHexBoard(-1);

			expect(hexes).toBeUndefined();
		});
	});

	describe('updateHex', () => {
		it('should return true when an existing hex id and an updated fields object are passed in', async () => {
			const updateOptions = {
				name: 'Replaced',
				terrain: 'Hills',
				explorationState: 'Explored',
				pointsOfInterest: 'Replaced',
				notes: 'Replaced',
			};

			const success = await hexService.updateHex(1, updateOptions);

			expect(success).toBe(true);
		});

		it('should return true when the updated fields object is empty', async () => {
			const success = await hexService.updateHex(1, {});

			expect(success).toBe(true);
		});

		it('should return false when the hex id doesnt exist in the database', async () => {
			const success = await hexService.updateHex(-1, {});

			expect(success).toBe(false);
		});
	});
});
