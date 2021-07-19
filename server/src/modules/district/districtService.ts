import { getRepository } from 'typeorm';

import { KingdomEntity } from '../kingdom';
import { LotEntity } from '../lot';
import { SettlementEntity } from '../settlement';
import { DistrictEntity } from './districtEntity';

export interface District {
	id: number;
	settlementId: number;
	name: string;
	paved: boolean;
	sewers: boolean;
	north: {
		terrain: string;
		wall: boolean;
		moat: boolean;
	};
	south: {
		terrain: string;
		wall: boolean;
		moat: boolean;
	};
	east: {
		terrain: string;
		wall: boolean;
		moat: boolean;
	};
	west: {
		terrain: string;
		wall: boolean;
		moat: boolean;
	};
	lotTypeList: (string | null)[];
}

export const districtService = {
	getAllDistricts,
	addDistrict,
};

async function getAllDistricts(kingdomId: number): Promise<District[]> {
	const districtRepository = getRepository(DistrictEntity);

	const districts = await districtRepository
		.createQueryBuilder('district')
		.leftJoinAndSelect('district.settlement', 'settlement')
		.leftJoinAndSelect('district.lots', 'lot', 'lot.district = district.id')
		.where({ kingdom: kingdomId })
		.getMany();

	return districts.map((district) => convertDistrictEntityToDistrict(district));
}

async function addDistrict(
	kingdomId: number,
	settlementId: number
): Promise<District | undefined> {
	const districtRepository = getRepository(DistrictEntity);
	const kingdomRepository = getRepository(KingdomEntity);
	const settlementRepository = getRepository(SettlementEntity);
	const lotRepository = getRepository(LotEntity);

	const kingdom = await kingdomRepository.findOne(kingdomId);
	const settlement = await settlementRepository.findOne(settlementId);

	if (!kingdom || !settlement) {
		return;
	}

	let temp = new DistrictEntity();
	temp.kingdom = kingdom;
	temp.settlement = settlement;
	temp.name = 'New District';
	temp.paved = false;
	temp.sewers = false;
	temp.terrainNorth = 'Land';
	temp.wallNorth = false;
	temp.moatNorth = false;
	temp.terrainSouth = 'Land';
	temp.wallSouth = false;
	temp.moatSouth = false;
	temp.terrainEast = 'Land';
	temp.wallEast = false;
	temp.moatEast = false;
	temp.terrainWest = 'Land';
	temp.wallWest = false;
	temp.moatWest = false;

	temp = await districtRepository.save(temp);

	const lot = new LotEntity();
	lot.district = temp;

	await lotRepository.save(Array.from({ length: 16 }, () => lot));

	const newDistrict = await districtRepository
		.createQueryBuilder('district')
		.leftJoinAndSelect('district.settlement', 'settlement')
		.leftJoinAndSelect('district.lots', 'lot', 'lot.district = district.id')
		.where({ kingdom: kingdomId, id: temp.id })
		.getOne();

	if (!newDistrict) {
		return;
	}

	return convertDistrictEntityToDistrict(newDistrict);
}

function convertDistrictEntityToDistrict(
	districtEntity: DistrictEntity
): District {
	const lotTypeList =
		districtEntity.lots?.map((lot) => lot.lotType ?? null) ?? [];

	return {
		id: districtEntity.id,
		settlementId: districtEntity.settlement.id,
		name: districtEntity.name,
		paved: districtEntity.paved,
		sewers: districtEntity.sewers,
		north: {
			terrain: districtEntity.terrainNorth,
			wall: districtEntity.wallNorth,
			moat: districtEntity.moatNorth,
		},
		south: {
			terrain: districtEntity.terrainSouth,
			wall: districtEntity.wallSouth,
			moat: districtEntity.moatSouth,
		},
		east: {
			terrain: districtEntity.terrainEast,
			wall: districtEntity.wallEast,
			moat: districtEntity.moatEast,
		},
		west: {
			terrain: districtEntity.terrainWest,
			wall: districtEntity.wallWest,
			moat: districtEntity.moatWest,
		},
		lotTypeList,
	};
}
