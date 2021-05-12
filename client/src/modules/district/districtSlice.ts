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
import { createEmptyLotArray /*initialDistricts */ } from './districtUtils';

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
		terrain: 'Land' | 'Water' | 'Cliff';
		wall: boolean; // TODO handle watergate
		moat: boolean;
	};
	south: {
		terrain: 'Land' | 'Water' | 'Cliff';
		wall: boolean;
		moat: boolean;
	};
	east: {
		terrain: 'Land' | 'Water' | 'Cliff';
		wall: boolean;
		moat: boolean;
	};
	west: {
		terrain: 'Land' | 'Water' | 'Cliff';
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
		};

		return newDistrict;
	}
);

export const districtSlice = createSlice({
	name: 'district',
	initialState,
	reducers: {
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
					console.log(action.payload);
					districtAdapter.addOne(state, action.payload);
				}
			);
	},
});

export const { lotUpdated, lotCleared } = districtSlice.actions;

export const {
	selectAll: selectAllDistricts,
	selectById: selectDistrictById,
	selectTotal: selectTotalDistricts,
} = districtAdapter.getSelectors<RootState>((state) => state.district);

export const selectDistrictsBySettlementId = createSelector(
	[
		selectAllDistricts,
		(state: RootState, settlementId: EntityId) => settlementId,
	],
	(districts, settlementId) =>
		districts.filter((district) => district.settlementId == settlementId)
);

export const districtReducer = districtSlice.reducer;
