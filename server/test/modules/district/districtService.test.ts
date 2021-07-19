import { connection, populateDatabase } from '../../testUtils';
import { districtService } from '../../../src/modules/district';

describe('districtService', () => {
	beforeEach(async () => {
		await connection.create();
		await populateDatabase();
	});
	afterEach(async () => await connection.close());

	describe('getAllDistricts', () => {
		it('should return an array of Districts when an existing kingdomId is passed in', async () => {
			const districts = await districtService.getAllDistricts(1);

			expect(districts.length).toBe(2);
			expect(districts[0].lotTypeList.length).toBe(2);
			expect(districts[1].lotTypeList.length).toBe(0);
		});

		it('should return an empty array when a nonexistent kingdomId is passed in', async () => {
			const districts = await districtService.getAllDistricts(-1);

			expect(districts.length).toBe(0);
		});
	});

	describe('addDistrict', () => {
		it('should return a newly created District when an existing kingdomId and settlementId is passed in', async () => {
			const district = await districtService.addDistrict(1, 1);

			expect(district).not.toBeUndefined();
			expect(district!.name).toBe('New District');
			expect(district!.north).toMatchObject({
				terrain: 'Land',
				wall: false,
				moat: false,
			});
			expect(district!.lotTypeList.length).toBe(16);
		});

		it('should return undefined when a nonexistent kingdomId is passed in', async () => {
			const district = await districtService.addDistrict(-1, 1);

			expect(district).toBeUndefined();
		});

		it('should return undefined when a nonexistent settlementId is passed in', async () => {
			const district = await districtService.addDistrict(1, -1);

			expect(district).toBeUndefined();
		});
	});
});
