import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

import { DistrictEntity } from '../district';
import { HexEntity } from '../hex';
import { KingdomEntity } from '../kingdom';

@Entity('settlement')
export class SettlementEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@OneToOne(() => HexEntity, (hex) => hex.settlement)
	hex!: HexEntity;

	@ManyToOne(() => KingdomEntity, (kingdom) => kingdom.settlements)
	kingdom!: KingdomEntity;

	@OneToMany(() => DistrictEntity, (district) => district.settlement)
	districts!: DistrictEntity[];

	@Column()
	name!: string;

	@Column()
	academy!: number;

	@Column()
	alchemist!: number;

	@Column()
	arena!: number;

	@Column()
	bank!: number;

	@Column()
	bardicCollege!: number;

	@Column()
	barracks!: number;

	@Column()
	blackMarket!: number;

	@Column()
	brewery!: number;

	@Column()
	bridge!: number;

	@Column()
	bureau!: number;

	@Column()
	castersTower!: number;

	@Column()
	castle!: number;

	@Column()
	cathedral!: number;

	@Column()
	cistern!: number;

	@Column()
	cityWall!: number;

	@Column()
	danceHall!: number;

	@Column()
	dump!: number;

	@Column()
	everflowingSpring!: number;

	@Column()
	exoticArtisan!: number;

	@Column()
	foreignQuarter!: number;

	@Column()
	foundry!: number;

	@Column()
	garrison!: number;

	@Column()
	granary!: number;

	@Column()
	graveyard!: number;

	@Column()
	guildhall!: number;

	@Column()
	herbalist!: number;

	@Column()
	hospital!: number;

	@Column()
	house!: number;

	@Column()
	inn!: number;

	@Column()
	jail!: number;

	@Column()
	library!: number;

	@Column()
	luxuryStore!: number;

	@Column()
	magicShop!: number;

	@Column()
	magicalAcademy!: number;

	@Column()
	magicalStreetlamps!: number;

	@Column()
	mansion!: number;

	@Column()
	market!: number;

	@Column()
	menagerie!: number;

	@Column()
	militaryAcademy!: number;

	@Column()
	mill!: number;

	@Column()
	mint!: number;

	@Column()
	moat!: number;

	@Column()
	monastery!: number;

	@Column()
	monument!: number;

	@Column()
	museum!: number;

	@Column()
	nobleVilla!: number;

	@Column()
	observatory!: number;

	@Column()
	orphanage!: number;

	@Column()
	palace!: number;

	@Column()
	park!: number;

	@Column()
	pavedStreets!: number;

	@Column()
	pier!: number;

	@Column()
	sewerSystem!: number;

	@Column()
	shop!: number;

	@Column()
	shrine!: number;

	@Column()
	smithy!: number;

	@Column()
	stable!: number;

	@Column()
	stockyard!: number;

	@Column()
	tannery!: number;

	@Column()
	tavern!: number;

	@Column()
	temple!: number;

	@Column()
	tenement!: number;

	@Column()
	theater!: number;

	@Column()
	townHall!: number;

	@Column()
	tradeShop!: number;

	@Column()
	university!: number;

	@Column()
	watchtower!: number;

	@Column()
	waterfront!: number;

	@Column()
	waterway!: number;

	@Column()
	wallUnrestUsed!: boolean;

	@Column()
	moatUnrestUsed!: boolean;

	@Column({ length: 16 })
	government!: string;
}
