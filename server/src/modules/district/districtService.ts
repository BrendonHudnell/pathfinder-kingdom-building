import { getRepository } from 'typeorm';

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
};

async function getAllDistricts(kingdomId: number): Promise<District[]> {
	const districtRepository = getRepository(DistrictEntity);

	const districts = await districtRepository
		.createQueryBuilder('district')
		.leftJoinAndSelect('district.settlement', 'settlement')
		.leftJoinAndSelect('district.lots', 'lot', 'lot.district = district.id')
		.where({ kingdom: kingdomId })
		.getMany();

	return districts.map((district) => {
		const lotTypeList = district.lots?.map((lot) => lot.lotType ?? null) ?? [];

		return {
			id: district.id,
			settlementId: district.settlement.id,
			name: district.name,
			paved: district.paved,
			sewers: district.sewers,
			north: {
				terrain: district.terrainNorth,
				wall: district.wallNorth,
				moat: district.moatNorth,
			},
			south: {
				terrain: district.terrainSouth,
				wall: district.wallSouth,
				moat: district.moatSouth,
			},
			east: {
				terrain: district.terrainEast,
				wall: district.wallEast,
				moat: district.moatEast,
			},
			west: {
				terrain: district.terrainWest,
				wall: district.wallWest,
				moat: district.moatWest,
			},
			lotTypeList,
		};
	});
}
