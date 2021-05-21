import { EntityId } from '@reduxjs/toolkit';

import { useAppSelector } from '../../components/store';
import {
	buildingInfoList,
	getBuildingDisplayTypeByLotType,
	selectAllDistricts,
	selectDistrictsBySettlementId,
} from '../district';

export type SettlementSize =
	| 'Small Town'
	| 'Large Town'
	| 'Small City'
	| 'Large City'
	| 'Metropolis';

export type SettlementStat = 'economy' | 'stability' | 'loyalty';

export function useSettlementPopulation(settlementId: EntityId): number {
	let numLots = 0;

	const districts = useAppSelector((state) =>
		selectDistrictsBySettlementId(state, settlementId)
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

export function getSettlementBaseValue(settlementSize: SettlementSize): number {
	if (settlementSize === 'Small Town') {
		return 1000;
	} else if (settlementSize === 'Large Town') {
		return 2000;
	} else if (settlementSize === 'Small City') {
		return 4000;
	} else if (settlementSize === 'Large City') {
		return 8000;
	} else {
		return 16000;
	}
}

export function useSettlementBonusByType(
	settlementId: EntityId,
	type: SettlementStat
): number {
	let total = 0;

	const districts = useAppSelector((state) =>
		selectDistrictsBySettlementId(state, settlementId)
	);
	districts.forEach((district) =>
		district.lotTypeList.forEach((lotType) => {
			if (lotType) {
				const displayType = getBuildingDisplayTypeByLotType(lotType);
				const info = buildingInfoList[displayType];
				total += Math.floor((info[type] ?? 0) / info.size);
			}
		})
	);

	return total;
}

export function useAllSettlementsBonusByType(type: SettlementStat): number {
	let total = 0;

	const districts = useAppSelector((state) => selectAllDistricts(state));

	districts.forEach((district) =>
		district.lotTypeList.forEach((lotType) => {
			if (lotType) {
				const displayType = getBuildingDisplayTypeByLotType(lotType);
				const info = buildingInfoList[displayType];
				total += Math.floor((info[type] ?? 0) / info.size);
			}
		})
	);

	return total;
}

export function useAllSettlementsUnrest(): number {
	let total = 0;

	const districts = useAppSelector((state) => selectAllDistricts(state));

	districts.forEach((district) =>
		district.lotTypeList.forEach((lotType) =>
			lotType
				? (total +=
						buildingInfoList[getBuildingDisplayTypeByLotType(lotType)].unrest ??
						0)
				: 0
		)
	);

	return total;
}

export function useSettlementUnrest(settlementId: EntityId): number {
	let total = 0;

	const districts = useAppSelector((state) =>
		selectDistrictsBySettlementId(state, settlementId)
	);

	districts.forEach((district) =>
		district.lotTypeList.forEach((lotType) =>
			lotType
				? (total +=
						buildingInfoList[getBuildingDisplayTypeByLotType(lotType)].unrest ??
						0)
				: 0
		)
	);

	return total;
}
