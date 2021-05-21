import { numberReducer } from '../../components/arrayNumberReducer';
import { useAppSelector } from '../../components/store';
import { LotType } from './buildingTypes';
import { selectAllDistricts } from './districtSlice';

export enum DistrictTerrainType {
	LAND = 'Land',
	WATER = 'Water',
	CLIFF = 'Cliff',
}

export type Direction = 'north' | 'south' | 'east' | 'west';

export function createEmptyLotArray(): (LotType | null)[] {
	const emptyArray: (LotType | null)[] = [];
	for (let i = 0; i < 36; i++) {
		emptyArray.push(null);
	}
	return emptyArray;
}

export function useTotalPopulation(): number {
	const districtList = useAppSelector((state) => selectAllDistricts(state));

	return (
		250 *
		districtList
			.map(
				(district) => district.lotTypeList.filter((lotType) => lotType).length
			)
			.reduce(numberReducer, 0)
	);
}

export function getDistrictTerrainColor(terrain?: DistrictTerrainType): string {
	if (terrain === DistrictTerrainType.CLIFF) {
		return 'lightgray';
	}
	if (terrain === DistrictTerrainType.WATER) {
		return 'blue';
	}
	return 'green';
}

export function getDistrictFortificationColor(
	wall?: boolean,
	moat?: boolean
): string {
	if (wall && moat) {
		return 'darkblue';
	}
	if (wall) {
		return 'gray';
	}
	if (moat) {
		return 'lightblue';
	}
	return 'transparent';
}
