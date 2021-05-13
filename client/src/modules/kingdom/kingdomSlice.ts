import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
	Alignment,
	HolidayEdict,
	initialKingdomState,
	PromotionEdict,
	TaxationEdict,
} from './kingdomUtils';

export interface KingdomState {
	name: string;
	alignment: Alignment;
	month: number;
	treasury: number;
	unrest: number;
	holidayEdict: HolidayEdict;
	promotionEdict: PromotionEdict;
	taxationEdict: TaxationEdict;
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
		alignmentUpdated: (state, action: PayloadAction<Alignment>) => {
			state.alignment = action.payload;
		},
		incrementMonth: (state) => {
			state.month++;
		},
		treasuryUpdated: (state, action: PayloadAction<number>) => {
			state.treasury = action.payload;
		},
		unrestUpdated: (state, action: PayloadAction<number>) => {
			state.unrest = action.payload;
		},
		holidayEdictLevelUpdated: (state, action: PayloadAction<HolidayEdict>) => {
			state.holidayEdict = action.payload;
		},
		promotionEdictLevelUpdated: (
			state,
			action: PayloadAction<PromotionEdict>
		) => {
			state.promotionEdict = action.payload;
		},
		taxationEdictLevelUpdated: (
			state,
			action: PayloadAction<TaxationEdict>
		) => {
			state.taxationEdict = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(
			fetchKingdomData.fulfilled,
			(state, action: PayloadAction<KingdomState>) => {
				const kingdom = action.payload;

				state.alignment = kingdom.alignment;
				state.holidayEdict = kingdom.holidayEdict;
				state.month = kingdom.month;
				state.name = kingdom.name;
				state.promotionEdict = kingdom.promotionEdict;
				state.taxationEdict = kingdom.taxationEdict;
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
