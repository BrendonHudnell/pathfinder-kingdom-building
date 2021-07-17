import { connection, populateDatabase } from '../testUtils';
import { kingdomService } from '../../../src/modules/kingdom';

describe('kingdomService', () => {
	beforeEach(async () => {
		await connection.create();
		await populateDatabase();
	});
	afterEach(async () => await connection.close());

	describe('getKingdom', () => {
		it('should return a Kingdom when an existing id is passed in', async () => {
			const kingdom = await kingdomService.getKingdom(1);

			expect(kingdom).not.toBeUndefined();
			expect(kingdom!.name).toBe('Kingdom 1');
			expect(kingdom!.holidayEdict).toBe('None');
			expect(kingdom!.options).toMatchObject({
				settlementModifiers: false,
				settlementGovernment: false,
				kingdomModifiers: false,
				kingdomGovernment: false,
				kingdomFame: false,
				leadershipSkills: false,
			});
		});

		it('should return undefined when a nonexistent id is passed in', async () => {
			const kingdom = await kingdomService.getKingdom(-1);

			expect(kingdom).toBeUndefined();
		});
	});
});
