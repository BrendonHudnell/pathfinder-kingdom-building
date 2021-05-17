import {
	createAsyncThunk,
	createEntityAdapter,
	createSelector,
	createSlice,
	EntityId,
	PayloadAction,
} from '@reduxjs/toolkit';

import { RootState } from '../../components/store';
import { BuildingId } from './buildingTypes';
import {
	createEmptyLotArray,
	Direction,
	DistrictTerrainType,
} from './districtUtils';

// {
// 	name: 'Watergate',
// 	description:
// 		'A gate in a City Wall that allows water (such as a river, Aqueduct, or Waterway) to enter the settlement. A Watergate has underwater defenses to block unwanted access. If you construct a Watergate when you construct a City Wall, the Watergate does not count toward the limit of the number of buildings you can construct per turn.',
// 	cost: 2,
// 	special: 'Shares City Wall',
// }

export interface District {
	id: EntityId;
	settlementId: EntityId;
	name: string;
	paved: boolean;
	sewers: boolean;
	north: {
		terrain: DistrictTerrainType;
		wall: boolean; // TODO handle watergate
		moat: boolean;
	};
	south: {
		terrain: DistrictTerrainType;
		wall: boolean;
		moat: boolean;
	};
	east: {
		terrain: DistrictTerrainType;
		wall: boolean;
		moat: boolean;
	};
	west: {
		terrain: DistrictTerrainType;
		wall: boolean;
		moat: boolean;
	};
	lotIds: BuildingId[];
}

const districtAdapter = createEntityAdapter<District>();

const initialState = districtAdapter.getInitialState();

export const fetchDistricts = createAsyncThunk(
	// TODO fix when server is hooked up
	'district/fetchDistricts',
	async (districts: District[]) => {
		return districts;
	}
);

export const addNewDistrict = createAsyncThunk(
	// TODO fix when server is hooked up
	'district/addNewDistrict',
	async (settlementId: EntityId) => {
		const districtId = Math.floor(Math.random() * 10000);
		const newDistrict: District = {
			id: districtId,
			settlementId,
			name: 'New District',
			paved: false,
			sewers: false,
			north: {
				terrain: DistrictTerrainType.LAND,
				wall: false,
				moat: false,
			},
			south: {
				terrain: DistrictTerrainType.LAND,
				wall: false,
				moat: false,
			},
			east: {
				terrain: DistrictTerrainType.LAND,
				wall: false,
				moat: false,
			},
			west: {
				terrain: DistrictTerrainType.LAND,
				wall: false,
				moat: false,
			},
			lotIds: createEmptyLotArray(),
		};

		return newDistrict;
	}
);

export const districtSlice = createSlice({
	name: 'district',
	initialState,
	reducers: {
		nameUpdated: (
			state,
			action: PayloadAction<{ districtId: EntityId; name: string }>
		) => {
			const { districtId, name } = action.payload;

			if (state.ids.includes(districtId)) {
				state.entities[districtId]!.name = name;
			}
		},
		pavedUpdated: (
			state,
			action: PayloadAction<{ districtId: EntityId; paved: boolean }>
		) => {
			const { districtId, paved } = action.payload;

			if (state.ids.includes(districtId)) {
				state.entities[districtId]!.paved = paved;
			}
		},
		sewersUpdated: (
			state,
			action: PayloadAction<{ districtId: EntityId; sewers: boolean }>
		) => {
			const { districtId, sewers } = action.payload;

			if (state.ids.includes(districtId)) {
				state.entities[districtId]!.sewers = sewers;
			}
		},
		terrainUpdated: (
			state,
			action: PayloadAction<{
				districtId: EntityId;
				direction: Direction;
				terrain: DistrictTerrainType;
			}>
		) => {
			const { districtId, direction, terrain } = action.payload;

			if (state.ids.includes(districtId)) {
				state.entities[districtId]![direction].terrain = terrain;
				if (terrain !== DistrictTerrainType.LAND) {
					state.entities[districtId]![direction].wall = false;
					state.entities[districtId]![direction].moat = false;
				}
			}
		},
		wallUpdated: (
			state,
			action: PayloadAction<{
				districtId: EntityId;
				direction: Direction;
				wall: boolean;
			}>
		) => {
			const { districtId, direction, wall } = action.payload;

			if (state.ids.includes(districtId)) {
				state.entities[districtId]![direction].wall = wall;
			}
		},
		moatUpdated: (
			state,
			action: PayloadAction<{
				districtId: EntityId;
				direction: Direction;
				moat: boolean;
			}>
		) => {
			const { districtId, direction, moat } = action.payload;

			if (state.ids.includes(districtId)) {
				state.entities[districtId]![direction].moat = moat;
			}
		},
		lotUpdated: (
			state,
			action: PayloadAction<{
				districtId: EntityId;
				newLotNumber: number;
				oldLotNumber?: number;
				buildingId: BuildingId;
			}>
		) => {
			const {
				districtId,
				newLotNumber,
				oldLotNumber,
				buildingId,
			} = action.payload;

			if (state.ids.includes(districtId)) {
				state.entities[districtId]!.lotIds[newLotNumber] = buildingId;
				if (oldLotNumber !== undefined) {
					state.entities[districtId]!.lotIds[oldLotNumber] = -1;
				}
			}
		},
		lotCleared: (
			state,
			action: PayloadAction<{ districtId?: EntityId; oldLotNumber?: number }>
		) => {
			const { districtId, oldLotNumber } = action.payload;

			if (
				districtId !== undefined &&
				oldLotNumber !== undefined &&
				state.ids.includes(districtId)
			) {
				state.entities[districtId]!.lotIds[oldLotNumber] = -1;
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(
			fetchDistricts.fulfilled,
			(state, action: PayloadAction<District[]>) => {
				districtAdapter.setAll(state, action.payload);
			}
		),
			builder.addCase(
				addNewDistrict.fulfilled,
				(state, action: PayloadAction<District>) => {
					districtAdapter.addOne(state, action.payload);
				}
			);
	},
});

export const {
	nameUpdated,
	pavedUpdated,
	sewersUpdated,
	terrainUpdated,
	wallUpdated,
	moatUpdated,
	lotUpdated,
	lotCleared,
} = districtSlice.actions;

export const {
	selectAll: selectAllDistricts,
	selectById: selectDistrictById,
} = districtAdapter.getSelectors<RootState>((state) => state.district);

export const selectDistrictsBySettlementId = createSelector(
	[
		selectAllDistricts,
		(state: RootState, settlementId: EntityId) => settlementId,
	],
	(districts, settlementId) =>
		districts.filter((district) => district.settlementId == settlementId)
);

export const selectTotalDistricts = createSelector(
	[selectAllDistricts],
	(districts) =>
		districts.filter(
			(district) => district.lotIds.filter((lotId) => lotId !== -1).length > 0
		).length
);

export const districtReducer = districtSlice.reducer;
