import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit';

import { RootState } from '../../components/store';
import { BuildingDisplayType } from '../district';
import { settlementApi } from './settlementApi';
import {
	SettlementBuildingList,
	SettlementGovernment,
} from './settlementUtils';

export interface Settlement {
	id: number;
	name: string;
	hexId: number;
	districts: number[];
	buildings: SettlementBuildingList;
	wallUnrestUsed: boolean;
	moatUnrestUsed: boolean;
	government: SettlementGovernment;
}

const settlementAdapter = createEntityAdapter<Settlement>({
	sortComparer: (a, b) => (a.id < b.id ? -1 : a.id === b.id ? 0 : 1),
});

const initialState = settlementAdapter.getInitialState();

export const fetchSettlements = createAsyncThunk(
	'settlement/fetchSettlements',
	async (kingdomId: number) => {
		const settlements = settlementApi.getAllSettlements(kingdomId);
		return settlements;
	}
);

export const addNewSettlement = createAsyncThunk(
	'settlement/addNewSettlement',
	async (ids: { kingdomId: number; hexId: number }) => {
		const newSettlement = await settlementApi.addSettlement(
			ids.kingdomId,
			ids.hexId
		);

		return newSettlement;
	}
);

export const settlementSlice = createSlice({
	name: 'settlement',
	initialState,
	reducers: {
		nameUpdated: (
			state,
			action: PayloadAction<{ settlementId: number; name: string }>
		) => {
			const { settlementId, name } = action.payload;

			const settlement = state.entities[settlementId];

			if (settlement) {
				settlement.name = name;
			}
		},
		buildingAdded: (
			state,
			action: PayloadAction<{
				settlementId: number;
				building: BuildingDisplayType;
			}>
		) => {
			const { settlementId, building } = action.payload;

			const settlement = state.entities[settlementId];

			if (settlement) {
				settlement.buildings[building]++;
			}
		},
		buildingRemoved: (
			state,
			action: PayloadAction<{
				settlementId: number;
				building: BuildingDisplayType;
			}>
		) => {
			const { settlementId, building } = action.payload;

			const settlement = state.entities[settlementId];

			if (settlement) {
				settlement.buildings[building]--;
			}
		},
		wallUnrestUsed: (state, action: PayloadAction<number>) => {
			const settlement = state.entities[action.payload];

			if (settlement) {
				settlement.wallUnrestUsed = true;
			}
		},
		moatUnrestUsed: (state, action: PayloadAction<number>) => {
			const settlement = state.entities[action.payload];

			if (settlement) {
				settlement.moatUnrestUsed = true;
			}
		},
		governmentUpdated: (
			state,
			action: PayloadAction<{
				settlementId: number;
				government: SettlementGovernment;
			}>
		) => {
			const { settlementId, government } = action.payload;

			const settlement = state.entities[settlementId];

			if (settlement) {
				settlement.government = government;
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(
			fetchSettlements.fulfilled,
			(state, action: PayloadAction<Settlement[]>) => {
				settlementAdapter.setAll(state, action.payload);
			}
		),
			builder.addCase(
				addNewSettlement.fulfilled,
				(state, action: PayloadAction<Settlement | undefined>) => {
					if (action.payload) {
						settlementAdapter.addOne(state, action.payload);
					}
				}
			);
	},
});

export const {
	nameUpdated,
	buildingAdded,
	buildingRemoved,
	wallUnrestUsed,
	moatUnrestUsed,
	governmentUpdated,
} = settlementSlice.actions;

export const {
	selectAll: selectAllSettlements,
	selectById: selectSettlementById,
} = settlementAdapter.getSelectors<RootState>((state) => state.settlement);

export const settlementReducer = settlementSlice.reducer;
