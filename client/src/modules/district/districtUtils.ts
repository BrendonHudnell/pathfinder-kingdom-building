import { numberReducer } from '../../components/arrayNumberReducer';
import { useAppSelector } from '../../components/store';
import { BuildingId } from './buildingTypes';
import { selectAllDistricts } from './districtSlice';

export function createEmptyLotArray(): BuildingId[] {
	const emptyArray: BuildingId[] = [];
	for (let i = 0; i < 36; i++) {
		emptyArray.push(-1);
	}
	return emptyArray;
}

export function useTotalPopulation(): number {
	const districtList = useAppSelector((state) => selectAllDistricts(state));

	return (
		250 *
		districtList
			.map((district) => district.lotIds.filter((lotId) => lotId !== -1).length)
			.reduce(numberReducer, 0)
	);
}
