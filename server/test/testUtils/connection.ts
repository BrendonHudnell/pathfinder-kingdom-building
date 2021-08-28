import { createConnection, getConnection } from 'typeorm';
import {
	DistrictEntity,
	HexEntity,
	KingdomEntity,
	LeadershipEntity,
	LotEntity,
	SettlementEntity,
	UserEntity,
} from '../../src/api';

export const connection = {
	async create() {
		await createConnection({
			type: 'sqlite',
			database: ':memory:',
			dropSchema: true,
			entities: [
				DistrictEntity,
				HexEntity,
				KingdomEntity,
				LeadershipEntity,
				LotEntity,
				SettlementEntity,
				UserEntity,
			],
			synchronize: true,
			logging: false,
		});
	},

	async close() {
		await getConnection().close();
	},
};
