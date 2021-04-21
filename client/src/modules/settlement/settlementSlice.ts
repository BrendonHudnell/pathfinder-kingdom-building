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
	},
});

export const { fetchSettlements } = settlementSlice.actions;

export const {
	selectAll: selectAllSettlements,
	selectById: selectSettlementById,
} = settlementAdapter.getSelectors<RootState>((state) => state.settlement);

export const settlementReducer = settlementSlice.reducer;
