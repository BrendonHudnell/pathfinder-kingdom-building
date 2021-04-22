import {
	createEntityAdapter,
	createSlice,
	EntityId,
	PayloadAction,
} from '@reduxjs/toolkit';

import { RootState } from '../../components/store';

export interface Settlement {
	id: EntityId;
	name: string;
	hexId: EntityId;
	districts: EntityId[];
}

const settlementAdapter = createEntityAdapter<Settlement>();

const initialState = settlementAdapter.getInitialState();

export const settlementSlice = createSlice({
	name: 'settlement',
	initialState,
	reducers: {
		fetchSettlements: (state, action: PayloadAction<Settlement[]>) => {
			settlementAdapter.setAll(state, action.payload);
		},
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
	},
});

export const { fetchSettlements, nameUpdated } = settlementSlice.actions;

export const {
	selectAll: selectAllSettlements,
	selectById: selectSettlementById,
} = settlementAdapter.getSelectors<RootState>((state) => state.settlement);

export const settlementReducer = settlementSlice.reducer;
