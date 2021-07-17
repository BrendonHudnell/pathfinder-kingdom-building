import { connection, populateDatabase } from '../../testUtils';
import { userService } from '../../../src/modules/user';

describe('userService', () => {
	beforeEach(async () => {
		await connection.create();
		await populateDatabase();
	});
	afterEach(async () => await connection.close());

	describe('register', () => {
		it('should return true when a username is available', async () => {
			const success = await userService.register('testName2', 'password');

			expect(success).toBe(true);
		});

		it('should return false when a username is taken', async () => {
			const success = await userService.register('testName', 'password2');

			expect(success).toBe(false);
		});
	});

	describe('login', () => {
		it('should return a token when login is successful', async () => {
			const token = await userService.login('testName', 'password');

			expect(typeof token).toBe('string');
		});

		it('should return undefined when the username is incorrect', async () => {
			const token = await userService.login('badName', 'password');

			expect(token).toBeUndefined();
		});

		it('should return undefined when the password is incorrect', async () => {
			const token = await userService.login('testName', 'badPassword');

			expect(token).toBeUndefined();
		});
	});
});
