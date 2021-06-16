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
	| 'defense'
	| 'corruption'
	| 'crime'
	| 'law'
	| 'lore'
	| 'productivity'
	| 'society'
	| 'fame';

export type SettlementBuildingList = Record<BuildingDisplayType, number>;

export enum SettlementGovernment {
	AUTOCRACY = 'Autocracy',
	COUNCIL = 'Council',
	MAGICAL = 'Magical',
	OVERLORD = 'Overlord',
	SECRET_SYNDICATE = 'Secret Syndicate',
}

export interface SettlementGovernmentMenuItem {
	title: string;
	value: SettlementGovernment;
}

export const settlementGovernmentMenuItems: SettlementGovernmentMenuItem[] = [
	{
		title: 'No bonuses',
		value: SettlementGovernment.AUTOCRACY,
	},
	{
		title: '+4 Society, -2 Law, -2 Lore',
		value: SettlementGovernment.COUNCIL,
	},
	{
		title: '+2 Lore, -2 Corruption, -2 Society, spellcasting +1 lvl',
		value: SettlementGovernment.MAGICAL,
	},
	{
		title: '+2 Corruption, +2 Law, -2 Crime, -2 Society',
		value: SettlementGovernment.OVERLORD,
	},
	{
		title: '+2 Corruption, +2 Productivity, +2 Crime, -6 Law',
		value: SettlementGovernment.SECRET_SYNDICATE,
	},
];

export interface GovernmentBonusObject {
	corruption: number;
	crime: number;
	law: number;
	lore: number;
	productivity: number;
	society: number;
}

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

export function getSettlementGovernmentBonuses(
	settlement: Settlement
): GovernmentBonusObject {
	switch (settlement.government) {
		case SettlementGovernment.AUTOCRACY:
			return {
				corruption: 0,
				crime: 0,
				law: 0,
				lore: 0,
				productivity: 0,
				society: 0,
			};
		case SettlementGovernment.COUNCIL:
			return {
				corruption: 0,
				crime: 0,
				law: -2,
				lore: -2,
				productivity: 0,
				society: 4,
			};
		case SettlementGovernment.MAGICAL:
			return {
				corruption: -2,
				crime: 0,
				law: 0,
				lore: 2,
				productivity: 0,
				society: -2,
			};
		case SettlementGovernment.OVERLORD:
			return {
				corruption: 2,
				crime: -2,
				law: 2,
				lore: 0,
				productivity: 0,
				society: -2,
			};
		case SettlementGovernment.SECRET_SYNDICATE:
			return {
				corruption: 2,
				crime: 2,
				law: -6,
				lore: 0,
				productivity: 2,
				society: 0,
			};
	}
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
