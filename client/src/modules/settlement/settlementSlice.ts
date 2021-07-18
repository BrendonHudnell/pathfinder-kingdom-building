import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit';

import { RootState } from '../../components/store';
import { BuildingDisplayType } from '../district';
import {
	createEmptySettlementBuildings,
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

const settlementAdapter = createEntityAdapter<Settlement>();

const initialState = settlementAdapter.getInitialState();

export const fetchSettlements = createAsyncThunk(
	// TODO fix when server is hooked up
	'settlement/fetchSettlements',
	async (settlements: Settlement[]) => {
		return settlements;
	}
);

export const addNewSettlement = createAsyncThunk(
	// TODO fix when server is hooked up
	'settlement/addNewSettlement',
	async (hexId: number) => {
		const settlementId = Math.floor(Math.random() * 10000);
		const newSettlement: Settlement = {
			id: settlementId,
			name: `Settlement ${settlementId}`,
			hexId,
			districts: [],
			buildings: createEmptySettlementBuildings(),
			wallUnrestUsed: false,
			moatUnrestUsed: false,
			government: SettlementGovernment.AUTOCRACY,
		};

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
				(state, action: PayloadAction<Settlement>) => {
					settlementAdapter.addOne(state, action.payload);
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
