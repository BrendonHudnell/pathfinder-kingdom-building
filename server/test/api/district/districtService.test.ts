import { connection, populateDatabase } from '../../testUtils';
import { District, districtService } from '../../../src/api';

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

	describe('createDistrict', () => {
		it('should return a newly created District when an existing kingdomId and settlementId is passed in', async () => {
			const district = await districtService.createDistrict(1, 1);

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
			const district = await districtService.createDistrict(-1, 1);

			expect(district).toBeUndefined();
		});

		it('should return undefined when a nonexistent settlementId is passed in', async () => {
			const district = await districtService.createDistrict(1, -1);

			expect(district).toBeUndefined();
		});
	});

	describe('updateDistrict', () => {
		it('should return true when an existing district id and an updated fields object are passed in', async () => {
			const updateOptions: Partial<District> = {
				name: 'Replaced',
				paved: true,
				sewers: true,
				north: {
					terrain: 'Water',
					wall: true,
					moat: true,
				},
				south: {
					terrain: 'Water',
					wall: true,
					moat: true,
				},
				east: {
					terrain: 'Water',
					wall: true,
					moat: true,
				},
				west: {
					terrain: 'Water',
					wall: true,
					moat: true,
				},
			};

			const success = await districtService.updateDistrict(1, updateOptions);

			expect(success).toBe(true);
		});

		it('should return true when the updated fields object is empty', async () => {
			const success = await districtService.updateDistrict(1, {});

			expect(success).toBe(true);
		});

		it('should return false when the district id doesnt exist in the database', async () => {
			const success = await districtService.updateDistrict(-1, {});

			expect(success).toBe(false);
		});
	});
});
