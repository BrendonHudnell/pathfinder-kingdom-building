import { numberReducer } from '../../components/arrayNumberReducer';
import { useAppSelector } from '../../components/store';
import { BuildingId } from './buildingTypes';
import { District, selectAllDistricts } from './districtSlice';

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

// TODO remove everything below when hooked up to DB
export const initialDistricts: District[] = [
	{
		id: 1,
		settlementId: 1,
		name: 'District 1',
		paved: false,
		sewers: false,
		north: {
			terrain: 'Land',
			wall: false,
			moat: false,
		},
		south: {
			terrain: 'Land',
			wall: false,
			moat: false,
		},
		east: {
			terrain: 'Land',
			wall: false,
			moat: false,
		},
		west: {
			terrain: 'Land',
			wall: false,
			moat: false,
		},
		lotIds: createEmptyLotArray(),
	},
	{
		id: 2,
		settlementId: 1,
		name: 'District 2',
		paved: false,
		sewers: false,
		north: {
			terrain: 'Land',
			wall: false,
			moat: false,
		},
		south: {
			terrain: 'Land',
			wall: false,
			moat: false,
		},
		east: {
			terrain: 'Land',
			wall: false,
			moat: false,
		},
		west: {
			terrain: 'Land',
			wall: false,
			moat: false,
		},
		lotIds: createEmptyLotArray(),
	},
	{
		id: 3,
		settlementId: 1,
		name: 'District 3',
		paved: false,
		sewers: false,
		north: {
			terrain: 'Land',
			wall: false,
			moat: false,
		},
		south: {
			terrain: 'Land',
			wall: false,
			moat: false,
		},
		east: {
			terrain: 'Land',
			wall: false,
			moat: false,
		},
		west: {
			terrain: 'Land',
			wall: false,
			moat: false,
		},
		lotIds: createEmptyLotArray(),
	},
	{
		id: 4,
		settlementId: 2,
		name: 'District 1',
		paved: false,
		sewers: false,
		north: {
			terrain: 'Land',
			wall: false,
			moat: false,
		},
		south: {
			terrain: 'Land',
			wall: false,
			moat: false,
		},
		east: {
			terrain: 'Land',
			wall: false,
			moat: false,
		},
		west: {
			terrain: 'Land',
			wall: false,
			moat: false,
		},
		lotIds: createEmptyLotArray(),
	},
	{
		id: 5,
		settlementId: 2,
		name: 'District 2',
		paved: false,
		sewers: false,
		north: {
			terrain: 'Land',
			wall: false,
			moat: false,
		},
		south: {
			terrain: 'Land',
			wall: false,
			moat: false,
		},
		east: {
			terrain: 'Land',
			wall: false,
			moat: false,
		},
		west: {
			terrain: 'Land',
			wall: false,
			moat: false,
		},
		lotIds: createEmptyLotArray(),
	},
	{
		id: 6,
		settlementId: 2,
		name: 'District 3',
		paved: false,
		sewers: false,
		north: {
			terrain: 'Land',
			wall: false,
			moat: false,
		},
		south: {
			terrain: 'Land',
			wall: false,
			moat: false,
		},
		east: {
			terrain: 'Land',
			wall: false,
			moat: false,
		},
		west: {
			terrain: 'Land',
			wall: false,
			moat: false,
		},
		lotIds: createEmptyLotArray(),
	},
	{
		id: 7,
		settlementId: 3,
		name: 'District 1',
		paved: false,
		sewers: false,
		north: {
			terrain: 'Land',
			wall: false,
			moat: false,
		},
		south: {
			terrain: 'Land',
			wall: false,
			moat: false,
		},
		east: {
			terrain: 'Land',
			wall: false,
			moat: false,
		},
		west: {
			terrain: 'Land',
			wall: false,
			moat: false,
		},
		lotIds: createEmptyLotArray(),
	},
	{
		id: 8,
		settlementId: 3,
		name: 'District 2',
		paved: false,
		sewers: false,
		north: {
			terrain: 'Land',
			wall: false,
			moat: false,
		},
		south: {
			terrain: 'Land',
			wall: false,
			moat: false,
		},
		east: {
			terrain: 'Land',
			wall: false,
			moat: false,
		},
		west: {
			terrain: 'Land',
			wall: false,
			moat: false,
		},
		lotIds: createEmptyLotArray(),
	},
	{
		id: 9,
		settlementId: 3,
		name: 'District 3',
		paved: false,
		sewers: false,
		north: {
			terrain: 'Land',
			wall: false,
			moat: false,
		},
		south: {
			terrain: 'Land',
			wall: false,
			moat: false,
		},
		east: {
			terrain: 'Land',
			wall: false,
			moat: false,
		},
		west: {
			terrain: 'Land',
			wall: false,
			moat: false,
		},
		lotIds: createEmptyLotArray(),
	},
];
