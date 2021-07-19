import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { kingdomApi } from './kingdomApi';
import {
	Alignment,
	FameKingdomLevel,
	FameValue,
	HolidayEdict,
	defaultKingdomState,
	KingdomFame,
	KingdomGovernment,
	PromotionEdict,
	TaxationEdict,
} from './kingdomUtils';

export interface KingdomState {
	id: number;
	name: string;
	alignment: Alignment;
	month: number;
	treasury: number;
	unrest: number;
	holidayEdict: HolidayEdict;
	promotionEdict: PromotionEdict;
	taxationEdict: TaxationEdict;
	fame: KingdomFame;
	government: KingdomGovernment;
	options: {
		settlementModifiers: boolean;
		settlementGovernment: boolean;
		kingdomModifiers: boolean;
		kingdomGovernment: boolean;
		kingdomFame: boolean;
		leadershipSkills: boolean;
	};
}

export const fetchKingdomData = createAsyncThunk(
	'kingdom/fetchKingdomData',
	async (id: number) => {
		const kingdomState = kingdomApi.getKingdom(id);
		return kingdomState;
	}
);

export const kingdomSlice = createSlice({
	name: 'kingdom',
	initialState: defaultKingdomState,
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
		unrestAdded: (state, action: PayloadAction<number>) => {
			state.unrest += action.payload;
			if (state.unrest < 0) {
				state.unrest = 0;
			}
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
		fameUpdated: (
			state,
			action: PayloadAction<{ level: FameKingdomLevel; value: FameValue }>
		) => {
			const { level, value } = action.payload;

			state.fame[level].set = true;
			state.fame[level].value = value;
		},
		governmentUpdated: (state, action: PayloadAction<KingdomGovernment>) => {
			state.government = action.payload;
		},
		settlementModifiersUpdated: (state, action: PayloadAction<boolean>) => {
			state.options.settlementModifiers = action.payload;
		},
		settlementGovernmentUpdated: (state, action: PayloadAction<boolean>) => {
			state.options.settlementGovernment = action.payload;
		},
		kingdomModifiersUpdated: (state, action: PayloadAction<boolean>) => {
			state.options.kingdomModifiers = action.payload;
		},
		kingdomGovernmentUpdated: (state, action: PayloadAction<boolean>) => {
			state.options.kingdomGovernment = action.payload;
		},
		kingdomFameUpdated: (state, action: PayloadAction<boolean>) => {
			state.options.kingdomFame = action.payload;
		},
		leadershipSkillsUpdated: (state, action: PayloadAction<boolean>) => {
			state.options.leadershipSkills = action.payload;
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
	unrestAdded,
	holidayEdictLevelUpdated,
	promotionEdictLevelUpdated,
	taxationEdictLevelUpdated,
	fameUpdated,
	governmentUpdated,
	settlementGovernmentUpdated,
	settlementModifiersUpdated,
	kingdomFameUpdated,
	kingdomGovernmentUpdated,
	kingdomModifiersUpdated,
	leadershipSkillsUpdated,
} = kingdomSlice.actions;

export const kingdomReducer = kingdomSlice.reducer;
