import { createConnection, getConnection } from 'typeorm';
import 'reflect-metadata';

import { env } from '../env';
import { KingdomEntity } from '../modules/kingdom';
import { HexEntity } from '../modules/hex';
import { DistrictEntity } from '../modules/district';
import { SettlementEntity } from '../modules/settlement';
import { LotEntity } from '../modules/lot';
import { LeadershipEntity } from '../modules/leadership';
import { UserEntity } from '../modules/user';

export const connection = {
	async create() {
		await createConnection({
			type: 'mysql',
			host: env.dbHost,
			username: env.dbUser,
			password: env.dbPassword,
			database: env.dbDatabase,
			port: env.dbPort,
			synchronize: false,
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
