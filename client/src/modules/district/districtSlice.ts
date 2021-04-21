import {
	createEntityAdapter,
	createSelector,
	createSlice,
	EntityId,
	PayloadAction,
} from '@reduxjs/toolkit';

import { RootState } from '../../components/store';
import { BuildingType } from './buildingTypes';

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
	lots: BuildingType[];
}

const districtAdapter = createEntityAdapter<District>();

const initialState = districtAdapter.getInitialState();

export const districtSlice = createSlice({
	name: 'district',
	initialState,
	reducers: {
		fetchDistricts: (state, action: PayloadAction<District[]>) => {
			districtAdapter.setAll(state, action.payload);
		},
		lotUpdated: (
			state,
			action: PayloadAction<{
				districtId: EntityId;
				newLotNumber: number;
				oldLotNumber?: number;
				item: BuildingType;
			}>
		) => {
			const { districtId, newLotNumber, oldLotNumber, item } = action.payload;

			if (state.ids.includes(districtId)) {
				state.entities[districtId]!.lots[newLotNumber] = item;
				if (oldLotNumber !== undefined) {
					state.entities[districtId]!.lots[oldLotNumber] = null;
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
				state.entities[districtId]!.lots[oldLotNumber] = null;
			}
		},
	},
});

export const { fetchDistricts, lotUpdated, lotCleared } = districtSlice.actions;

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

export const districtReducer = districtSlice.reducer;
