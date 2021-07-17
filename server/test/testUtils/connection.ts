import { createConnection, getConnection } from 'typeorm';

import { DistrictEntity } from '../../src/modules/district';
import { HexEntity } from '../../src/modules/hex';
import { KingdomEntity } from '../../src/modules/kingdom';
import { LeadershipEntity } from '../../src/modules/leadership';
import { LotEntity } from '../../src/modules/lot';
import { SettlementEntity } from '../../src/modules/settlement';
import { UserEntity } from '../../src/modules/user';

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
