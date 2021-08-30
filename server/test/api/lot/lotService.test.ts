import { connection, populateDatabase } from '../../testUtils';
import { Lot, lotService } from '../../../src/api';

describe('lotService', () => {
	beforeEach(async () => {
		await connection.create();
		await populateDatabase();
	});
	afterEach(async () => await connection.close());

	describe('updateLot', () => {
		it('should return true when an existing lot id and an updated fields object are passed in', async () => {
			const updateOptions: Partial<Lot> = {
				lotType: 'House',
			};

			const success = await lotService.updateLot(1, updateOptions);

			expect(success).toBe(true);
		});

		it('should return true when the updated fields object is empty', async () => {
			const success = await lotService.updateLot(1, {});

			expect(success).toBe(true);
		});

		it('should return false when the hex id doesnt exist in the database', async () => {
			const success = await lotService.updateLot(-1, {});

			expect(success).toBe(false);
		});
	});
});
