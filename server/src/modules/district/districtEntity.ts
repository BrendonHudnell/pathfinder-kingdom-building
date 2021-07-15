import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

import { KingdomEntity } from '../kingdom';
import { LotEntity } from '../lot';
import { SettlementEntity } from '../settlement';

@Entity('district')
export class DistrictEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(() => KingdomEntity, (kingdom) => kingdom.districts)
	kingdom!: KingdomEntity;

	@ManyToOne(() => SettlementEntity, (settlement) => settlement.districts)
	settlement!: SettlementEntity;

	@Column()
	name!: string;

	@Column()
	paved!: boolean;

	@Column()
	sewers!: boolean;

	@Column({ length: 5 })
	terrainNorth!: string;

	@Column()
	wallNorth!: boolean;

	@Column()
	moatNorth!: boolean;

	@Column({ length: 5 })
	terrainSouth!: string;

	@Column()
	wallSouth!: boolean;

	@Column()
	moatSouth!: boolean;

	@Column({ length: 5 })
	terrainEast!: string;

	@Column()
	wallEast!: boolean;

	@Column()
	moatEast!: boolean;

	@Column({ length: 5 })
	terrainWest!: string;

	@Column()
	wallWest!: boolean;

	@Column()
	moatWest!: boolean;

	@OneToMany(() => LotEntity, (lot) => lot.district)
	lots!: LotEntity[];
}
