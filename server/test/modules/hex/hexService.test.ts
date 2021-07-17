import { connection, populateDatabase } from '../../testUtils';
import { hexService } from '../../../src/modules/hex';

describe('districtService', () => {
	beforeEach(async () => {
		await connection.create();
		await populateDatabase();
	});
	afterEach(async () => await connection.close());

	describe('getAllHexes', () => {
		it('should return an array of Hexes when an existing kingdomId is passed in', async () => {
			const hexes = await hexService.getAllHexes(1);

			expect(hexes.length).toBe(2);
		});

		it('should return an empty array when a nonexistent kingdomId is passed in', async () => {
			const hexes = await hexService.getAllHexes(-1);

			expect(hexes.length).toBe(0);
		});
	});
});
