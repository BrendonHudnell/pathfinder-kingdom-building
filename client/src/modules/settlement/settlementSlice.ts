import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
	EntityId,
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
	id: EntityId;
	name: string;
	hexId: EntityId;
	districts: EntityId[];
	buildings: SettlementBuildingList;
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
	async (hexId: EntityId) => {
		const settlementId = Math.floor(Math.random() * 10000);
		const newSettlement: Settlement = {
			id: settlementId,
			name: `Settlement ${settlementId}`,
			hexId,
			districts: [],
			buildings: createEmptySettlementBuildings(),
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
			action: PayloadAction<{ settlementId: EntityId; name: string }>
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
				settlementId: EntityId;
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
				settlementId: EntityId;
				building: BuildingDisplayType;
			}>
		) => {
			const { settlementId, building } = action.payload;

			const settlement = state.entities[settlementId];

			if (settlement) {
				settlement.buildings[building]--;
			}
		},
		governmentUpdated: (
			state,
			action: PayloadAction<{
				settlementId: EntityId;
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
	governmentUpdated,
} = settlementSlice.actions;

export const {
	selectAll: selectAllSettlements,
	selectById: selectSettlementById,
} = settlementAdapter.getSelectors<RootState>((state) => state.settlement);

export const settlementReducer = settlementSlice.reducer;
