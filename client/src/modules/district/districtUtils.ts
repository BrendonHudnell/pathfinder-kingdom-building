import { BuildingId } from './buildingTypes';
import { District } from './districtSlice';

// TODO remove everything below when hooked up to DB
function createLotArray(): BuildingId[] {
	const emptyArray: BuildingId[] = [];
	for (let i = 0; i < 36; i++) {
		emptyArray.push(-1);
	}
	return emptyArray;
}

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
		lotIds: createLotArray(),
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
		lotIds: createLotArray(),
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
		lotIds: createLotArray(),
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
		lotIds: createLotArray(),
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
		lotIds: createLotArray(),
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
		lotIds: createLotArray(),
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
		lotIds: createLotArray(),
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
		lotIds: createLotArray(),
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
		lotIds: createLotArray(),
	},
];
