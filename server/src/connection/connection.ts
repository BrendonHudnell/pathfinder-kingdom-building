import { createConnection, getConnection } from 'typeorm';
import 'reflect-metadata';

import { env } from '../env';
import { KingdomEntity } from '../modules/kingdom';
import { HexEntity } from '../modules/hex';

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
			entities: [HexEntity, KingdomEntity],
		});
	},

	async close() {
		await getConnection().close();
	},
};
