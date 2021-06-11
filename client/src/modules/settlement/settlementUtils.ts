import { numberReducer } from '../../components/arrayNumberReducer';
import { useAppSelector } from '../../components/store';
import {
	BuildingDisplayType,
	buildingInfoList,
	selectDistrictsBySettlementId,
} from '../district';
import { selectAllSettlements, Settlement } from './settlementSlice';

export type SettlementSize =
	| 'Small Town'
	| 'Large Town'
	| 'Small City'
	| 'Large City'
	| 'Metropolis';

export type SettlementStat =
	| 'economy'
	| 'stability'
	| 'loyalty'
	| 'baseValueIncrease'
	| 'defense';

export type SettlementBuildingList = Record<BuildingDisplayType, number>;

export function useSettlementPopulation(settlement: Settlement): number {
	let numLots = 0;

	const districts = useAppSelector((state) =>
		selectDistrictsBySettlementId(state, settlement.id)
	);
	districts.forEach((district) =>
		district.lotTypeList.forEach((lotType) => (lotType ? numLots++ : ''))
	);

	const population = 250 * numLots;

	return population;
}

export function getSettlementSize(population: number): SettlementSize {
	if (population <= 2000) {
		return 'Small Town';
	} else if (population <= 5000) {
		return 'Large Town';
	} else if (population <= 10000) {
		return 'Small City';
	} else if (population <= 25000) {
		return 'Large City';
	} else {
		return 'Metropolis';
	}
}

export function useSettlementBaseValue(settlement: Settlement): number {
	const population = useSettlementPopulation(settlement);

	let baseValue: number;
	if (population <= 2000) {
		baseValue = 1000;
	} else if (population <= 5000) {
		baseValue = 2000;
	} else if (population <= 10000) {
		baseValue = 4000;
	} else if (population <= 25000) {
		baseValue = 8000;
	} else {
		baseValue = 16000;
	}

	const buildingBonus = useSettlementBonusByType(
		settlement,
		'baseValueIncrease'
	);

	return baseValue + buildingBonus;
}

export function useSettlementDefense(settlement: Settlement): number {
	const districts = useAppSelector((state) =>
		selectDistrictsBySettlementId(state, settlement.id)
	);
	const fortificationBonus = districts
		.map((district) => {
			let districtFortificationBonus = 0;
			district.north.wall ? districtFortificationBonus++ : '';
			district.north.moat ? districtFortificationBonus++ : '';
			district.south.wall ? districtFortificationBonus++ : '';
			district.south.moat ? districtFortificationBonus++ : '';
			district.east.wall ? districtFortificationBonus++ : '';
			district.east.moat ? districtFortificationBonus++ : '';
			district.west.wall ? districtFortificationBonus++ : '';
			district.west.moat ? districtFortificationBonus++ : '';
			return districtFortificationBonus;
		})
		.reduce(numberReducer, 0);

	const buildingBonus = useSettlementBonusByType(settlement, 'defense');

	return fortificationBonus + buildingBonus;
}

export function useSettlementBonusByType(
	settlement: Settlement,
	type: SettlementStat
): number {
	let total = 0;

	Object.entries(settlement.buildings).forEach(
		([building, amount]) =>
			(total +=
				amount * (buildingInfoList[building as BuildingDisplayType][type] ?? 0))
	);

	return total;
}

export function useAllSettlementsBonusByType(type: SettlementStat): number {
	let total = 0;

	const settlements = useAppSelector((state) => selectAllSettlements(state));

	settlements.forEach((settlement) =>
		Object.entries(settlement.buildings).forEach(
			([building, amount]) =>
				(total +=
					amount *
					(buildingInfoList[building as BuildingDisplayType][type] ?? 0))
		)
	);

	return total;
}

export function createEmptySettlementBuildings(): SettlementBuildingList {
	return {
		Academy: 0,
		Alchemist: 0,
		Arena: 0,
		Bank: 0,
		'Bardic College': 0,
		Barracks: 0,
		'Black Market': 0,
		Brewery: 0,
		Bridge: 0,
		Bureau: 0,
		"Caster's Tower": 0,
		Castle: 0,
		Cathedral: 0,
		Cistern: 0,
		'City Wall': 0,
		'Dance Hall': 0,
		Dump: 0,
		'Everflowing Spring': 0,
		'Exotic Artisan': 0,
		'Foreign Quarter': 0,
		Foundry: 0,
		Garrison: 0,
		Granary: 0,
		Graveyard: 0,
		Guildhall: 0,
		Herbalist: 0,
		Hospital: 0,
		House: 0,
		Inn: 0,
		Jail: 0,
		Library: 0,
		'Luxury Store': 0,
		'Magic Shop': 0,
		'Magical Academy': 0,
		'Magical Streetlamps': 0,
		Mansion: 0,
		Market: 0,
		Menagerie: 0,
		'Military Academy': 0,
		Mill: 0,
		Mint: 0,
		Moat: 0,
		Monastery: 0,
		Monument: 0,
		Museum: 0,
		'Noble Villa': 0,
		Observatory: 0,
		Orphanage: 0,
		Palace: 0,
		Park: 0,
		'Paved Streets': 0,
		Pier: 0,
		'Sewer System': 0,
		Shop: 0,
		Shrine: 0,
		Smithy: 0,
		Stable: 0,
		Stockyard: 0,
		Tannery: 0,
		Tavern: 0,
		Temple: 0,
		Tenement: 0,
		Theater: 0,
		'Town Hall': 0,
		'Trade Shop': 0,
		University: 0,
		Watchtower: 0,
		Waterfront: 0,
		Waterway: 0,
	};
}
