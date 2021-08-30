import { connection, populateDatabase, testKingdom } from '../../testUtils';
import { Kingdom, kingdomService } from '../../../src/api';

describe('kingdomService', () => {
	beforeEach(async () => {
		await connection.create();
		await populateDatabase();
	});
	afterEach(async () => await connection.close());

	describe('getKingdom', () => {
		it('should return a Kingdom when an existing id is passed in', async () => {
			const kingdom = await kingdomService.getKingdom(1);

			expect(kingdom).toMatchObject(testKingdom);
		});

		it('should return undefined when a nonexistent id is passed in', async () => {
			const kingdom = await kingdomService.getKingdom(-1);

			expect(kingdom).toBeUndefined();
		});
	});

	describe('updateKingdom', () => {
		it('should return true when an existing kingdom id and an updated fields object are passed in', async () => {
			const updateOptions: Partial<Kingdom> = {
				name: 'Replaced',
				alignment: 'Neutral',
				month: 123,
				treasury: 123,
				unrest: 123,
				holidayEdict: 'None',
				promotionEdict: 'None',
				taxationEdict: 'None',
				fame: {
					1: {
						set: true,
						value: 'fame',
					},
					11: {
						set: true,
						value: 'fame',
					},
					26: {
						set: true,
						value: 'fame',
					},
					51: {
						set: true,
						value: 'fame',
					},
					101: {
						set: true,
						value: 'fame',
					},
					201: {
						set: true,
						value: 'fame',
					},
				},
				government: 'Feudal Monarchy',
				options: {
					settlementModifiers: true,
					settlementGovernment: true,
					kingdomModifiers: true,
					kingdomGovernment: true,
					kingdomFame: true,
					leadershipSkills: true,
				},
			};

			const success = await kingdomService.updateKingdom(1, updateOptions);

			expect(success).toBe(true);
		});

		it('should return true when the updated fields object is empty', async () => {
			const success = await kingdomService.updateKingdom(1, {});

			expect(success).toBe(true);
		});

		it('should return false when the hex id doesnt exist in the database', async () => {
			const success = await kingdomService.updateKingdom(-1, {});

			expect(success).toBe(false);
		});
	});
});
