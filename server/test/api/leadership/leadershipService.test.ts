import { connection, populateDatabase } from '../../testUtils';
import { leadershipService } from '../../../src/api';

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

	describe('createViceroy', () => {
		it('should return a newly created LeadershipRole when an existing kingdomId and settlementId is passed in', async () => {
			const viceroy = await leadershipService.createViceroy(1);

			expect(viceroy).not.toBeUndefined();
			expect(viceroy!.name).toBe('Viceroy');
			expect(viceroy!.vacant).toBe(true);
		});

		it('should return undefined when a nonexistent kingdomId is passed in', async () => {
			const viceroy = await leadershipService.createViceroy(-1);

			expect(viceroy).toBeUndefined();
		});
	});
});
