import { connection, populateDatabase } from '../testUtils';
import { settlementService } from '../../../src/modules/settlement';

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
});
