import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

import { DistrictEntity } from '../district';
import { HexEntity } from '../hex';
import { LeadershipEntity } from '../leadership';
import { SettlementEntity } from '../settlement';
import { UserEntity } from '../user';

@Entity('kingdom')
export class KingdomEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(() => UserEntity, (user) => user.kingdoms)
	user!: UserEntity;

	@Column()
	name!: string;

	@Column({ length: 15 })
	alignment!: string;

	@Column()
	month!: number;

	@Column()
	treasury!: number;

	@Column()
	unrest!: number;

	@Column({ length: 7 })
	holidayEdict!: string;

	@Column({ length: 12 })
	promotionEdict!: string;

	@Column({ length: 12 })
	taxationEdict!: string;

	@Column()
	fame1Set!: boolean;

	@Column({ length: 6 })
	fame1Value!: string;

	@Column()
	fame11Set!: boolean;

	@Column({ length: 6 })
	fame11Value!: string;

	@Column()
	fame26Set!: boolean;

	@Column({ length: 6 })
	fame26Value!: string;

	@Column()
	fame51Set!: boolean;

	@Column({ length: 6 })
	fame51Value!: string;

	@Column()
	fame101Set!: boolean;

	@Column({ length: 6 })
	fame101Value!: string;

	@Column()
	fame201Set!: boolean;

	@Column({ length: 6 })
	fame201Value!: string;

	@Column({ length: 16 })
	government!: string;

	@Column()
	settlementModifiers!: boolean;

	@Column()
	settlementGovernment!: boolean;

	@Column()
	kingdomModifiers!: boolean;

	@Column()
	kingdomGovernment!: boolean;

	@Column()
	kingdomFame!: boolean;

	@Column()
	leadershipSkills!: boolean;

	@OneToMany(() => HexEntity, (hex) => hex.kingdom)
	hexes!: HexEntity[];

	@OneToMany(() => SettlementEntity, (settlement) => settlement.kingdom)
	settlements!: SettlementEntity[];

	@OneToMany(() => DistrictEntity, (district) => district.kingdom)
	districts!: DistrictEntity[];

	@OneToMany(() => LeadershipEntity, (leadershipRole) => leadershipRole.kingdom)
	leadershipRoles!: LeadershipEntity[];
}
