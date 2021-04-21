import { EntityId } from '@reduxjs/toolkit';

import { useAppSelector } from '../../components/store';
import { selectDistrictsBySettlementId } from '../district';
import { KingdomStat } from '../leadership';
import { Settlement } from './settlementSlice';

export type SettlementSize =
	| 'Small Town'
	| 'Large Town'
	| 'Small City'
	| 'Large City'
	| 'Metropolis';

export function useSettlementPopulation(settlementId: EntityId): number {
	let numLots = 0;

	const districts = useAppSelector((state) =>
		selectDistrictsBySettlementId(state, settlementId)
	);
	districts.forEach((district) =>
		district.lots.forEach((lot) => (lot ? numLots++ : ''))
	);

	const population = 250 * numLots;

	return population;
}

export function useSettlementSize(settlementId: EntityId): SettlementSize {
	const population = useSettlementPopulation(settlementId);

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

export function useSettlementBonusByType(
	settlementId: EntityId,
	type: KingdomStat
): number {
	// const districts = useAppSelector((state) =>
	// 	selectDistrictsBySettlementId(state, settlementId)
	// );

	return -999;
}

export function useSettlementUnrest(settlementId: EntityId): number {
	// const districts = useAppSelector((state) =>
	// 	selectDistrictsBySettlementId(state, settlementId)
	// );

	return -99999;
}

// TODO remove everything below when hooked up to DB
export const initialSettlements: Settlement[] = [
	{
		id: 1,
		name: 'Test Settlement 1',
		hexId: 69,
		districts: [1, 2, 3],
	},
	{
		id: 2,
		name: 'Test Settlement 2',
		hexId: 3,
		districts: [4, 5, 6],
	},
	{
		id: 3,
		name: 'Test Settlement 3',
		hexId: 23,
		districts: [7, 8, 9],
	},
];
