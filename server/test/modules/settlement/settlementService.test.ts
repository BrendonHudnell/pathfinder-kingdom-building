import { connection, populateDatabase } from '../../testUtils';
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

	describe('addSettlement', () => {
		it('should return a newly created Settlement when an existing kingdomId and hexId is passed in', async () => {
			const settlement = await settlementService.addSettlement(1, 3);

			expect(settlement).not.toBeUndefined();
			expect(settlement!.name).toBe('New Settlement');
			expect(settlement!.government).toBe('Autocracy');
		});

		it('should return undefined when a nonexistent kingdomId is passed in', async () => {
			const settlement = await settlementService.addSettlement(-1, 3);

			expect(settlement).toBeUndefined();
		});

		it('should return undefined when a nonexistent hexId is passed in', async () => {
			const settlement = await settlementService.addSettlement(1, -1);

			expect(settlement).toBeUndefined();
		});
	});
});
