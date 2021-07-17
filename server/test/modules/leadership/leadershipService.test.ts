import { connection, populateDatabase } from '../testUtils';
import { leadershipService } from '../../../src/modules/leadership';

describe('leadershipService', () => {
	beforeEach(async () => {
		await connection.create();
		await populateDatabase();
	});
	afterEach(async () => await connection.close());

	describe('getAllLeadershipRoles', () => {
		it('should return an array of LeadershipRoles when an existing kingdomId is passed in', async () => {
			const districts = await leadershipService.getAllLeadershipRoles(1);

			expect(districts.length).toBe(1);
		});

		it('should return an empty array when a nonexistent kingdomId is passed in', async () => {
			const districts = await leadershipService.getAllLeadershipRoles(-1);

			expect(districts.length).toBe(0);
		});
	});
});
