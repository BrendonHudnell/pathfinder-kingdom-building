import { EntityId } from '@reduxjs/toolkit';

import { useAppSelector } from '../../components/store';
import { numberReducer } from '../../components/arrayNumberReducer';
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

export function useSettlementBaseValue(settlementId: EntityId): number {
	const population = useSettlementPopulation(settlementId);
	const districts = useAppSelector((state) =>
		selectDistrictsBySettlementId(state, settlementId)
	);

	let base: number;
	if (population <= 2000) {
		base = 1000;
	} else if (population <= 5000) {
		base = 2000;
	} else if (population <= 10000) {
		base = 4000;
	} else if (population <= 25000) {
		base = 8000;
	} else {
		base = 16000;
	}

	const buildings = districts
		.map((district) =>
			district.lotTypeList
				.filter((lotType) => lotType)
				.map(
					(lotType) =>
						buildingInfoList[getBuildingDisplayTypeByLotType(lotType!)]
							.baseValueIncrease ?? 0
				)
				.reduce(numberReducer, 0)
		)
		.reduce(numberReducer, 0);

	return base + buildings;
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
			if (district.paved) {
				type === 'economy' ? (total += 2) : '';
				type === 'stability' ? total++ : '';
			}
			if (district.sewers) {
				type === 'stability' ? (total += 2) : '';
				type === 'loyalty' ? total++ : '';
			}
		})
	);

	return total;
}

export function useAllSettlementsBonusByType(type: SettlementStat): number {
	let total = 0;

	const districts = useAppSelector((state) => selectAllDistricts(state));

	districts.forEach((district) => {
		district.lotTypeList.forEach((lotType) => {
			if (lotType) {
				const displayType = getBuildingDisplayTypeByLotType(lotType);
				const info = buildingInfoList[displayType];
				total += Math.floor((info[type] ?? 0) / info.size);
			}
		});
		if (district.paved) {
			type === 'economy' ? (total += 2) : '';
			type === 'stability' ? total++ : '';
		}
		if (district.sewers) {
			type === 'stability' ? (total += 2) : '';
			type === 'loyalty' ? total++ : '';
		}
	});

	return total;
}
