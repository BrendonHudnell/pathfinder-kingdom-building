import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { initialKingdomState } from './kingdomUtils';

export interface KingdomState {
	name: string;
	alignment: string;
	month: number;
	treasury: number;
	unrest: number;
	holidayEdictLevel: number;
	promotionEdictLevel: number;
	taxationEdictLevel: number;
}

export const fetchKingdomData = createAsyncThunk(
	// TODO fix when server is hooked up
	'kingdom/fetchKingdomData',
	async (kingdomState: KingdomState) => {
		return kingdomState;
	}
);

export const kingdomSlice = createSlice({
	name: 'kingdom',
	initialState: initialKingdomState,
	reducers: {
		nameUpdated: (state, action: PayloadAction<string>) => {
			state.name = action.payload;
		},
		alignmentUpdated: (state, action: PayloadAction<string>) => {
			state.alignment = action.payload;
		},
		incrementMonth: (state) => {
			state.month += 1;
		},
		treasuryUpdated: (state, action: PayloadAction<number>) => {
			state.treasury = action.payload;
		},
		unrestUpdated: (state, action: PayloadAction<number>) => {
			state.unrest = action.payload;
		},
		holidayEdictLevelUpdated: (state, action: PayloadAction<number>) => {
			state.holidayEdictLevel = action.payload;
		},
		promotionEdictLevelUpdated: (state, action: PayloadAction<number>) => {
			state.promotionEdictLevel = action.payload;
		},
		taxationEdictLevelUpdated: (state, action: PayloadAction<number>) => {
			state.taxationEdictLevel = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(
			fetchKingdomData.fulfilled,
			(state, action: PayloadAction<KingdomState>) => {
				const kingdom = action.payload;

				state.alignment = kingdom.alignment;
				state.holidayEdictLevel = kingdom.holidayEdictLevel;
				state.month = kingdom.month;
				state.name = kingdom.name;
				state.promotionEdictLevel = kingdom.promotionEdictLevel;
				state.taxationEdictLevel = kingdom.taxationEdictLevel;
				state.treasury = kingdom.treasury;
				state.unrest = kingdom.unrest;
			}
		);
	},
});

export const {
	nameUpdated,
	alignmentUpdated,
	incrementMonth,
	treasuryUpdated,
	unrestUpdated,
	holidayEdictLevelUpdated,
	promotionEdictLevelUpdated,
	taxationEdictLevelUpdated,
} = kingdomSlice.actions;

export const kingdomReducer = kingdomSlice.reducer;
