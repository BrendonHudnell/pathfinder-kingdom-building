import { createConnection, getConnection } from 'typeorm';
import 'reflect-metadata';

import { env } from '../env';
import {
	DistrictEntity,
	HexEntity,
	KingdomEntity,
	LeadershipEntity,
	LotEntity,
	SettlementEntity,
	UserEntity,
} from '../api';

export const connection = {
	async create() {
		await createConnection({
			type: 'mysql',
			host: env.dbHost,
			username: env.dbUser,
			password: env.dbPassword,
			database: env.dbDatabase,
			port: env.dbPort,
			dropSchema: env.dbDropSchema,
			synchronize: env.dbSynchronize,
			entities: [
				DistrictEntity,
				HexEntity,
				KingdomEntity,
				LeadershipEntity,
				LotEntity,
				SettlementEntity,
				UserEntity,
			],
		});
	},

	async close() {
		await getConnection().close();
	},
};
