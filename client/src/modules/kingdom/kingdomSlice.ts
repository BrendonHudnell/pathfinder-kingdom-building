import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface KingdomState {
	name: string;
	alignment: string;
	month: number;
	treasury: number;
	consumption: number;
	economy: number;
	stability: number;
	loyalty: number;
	unrest: number;
	holidayEdictLevel: number;
	promotionEdictLevel: number;
	taxationEdictLevel: number;
}

export const initialKingdomState: KingdomState = {
	name: 'Untitled',
	alignment: 'N',
	month: 1,
	treasury: 0,
	consumption: 0,
	economy: 0,
	stability: 3,
	loyalty: 0,
	unrest: 0,
	holidayEdictLevel: 0,
	promotionEdictLevel: 0,
	taxationEdictLevel: 0,
};

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
			const oldAlignment = state.alignment;
			const newAlignment = action.payload;

			state.alignment = newAlignment;

			// remove old alignment bonuses
			if (oldAlignment[0] === 'L') {
				state.economy -= 2;
			} else if (oldAlignment[0] === 'N') {
				state.stability -= 2;
			} else if (oldAlignment[0] === 'C') {
				state.loyalty -= 2;
			}
			if (oldAlignment[1] === undefined || oldAlignment[1] === 'N') {
				state.stability -= 2;
			} else if (oldAlignment[1] === 'G') {
				state.loyalty -= 2;
			} else if (oldAlignment[1] === 'E') {
				state.economy -= 2;
			}

			// add new alignment bonuses
			if (newAlignment[0] === 'L') {
				state.economy += 2;
			} else if (newAlignment[0] === 'N') {
				state.stability += 2;
			} else if (newAlignment[0] === 'C') {
				state.loyalty += 2;
			}
			if (newAlignment[1] === undefined || newAlignment[1] === 'N') {
				state.stability += 2;
			} else if (newAlignment[1] === 'G') {
				state.loyalty += 2;
			} else if (newAlignment[1] === 'E') {
				state.economy += 2;
			}
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
			const oldLevel = state.holidayEdictLevel;
			const newLevel = action.payload;

			state.holidayEdictLevel = newLevel;

			if (oldLevel === 0) {
				state.loyalty += 1;
			} else if (oldLevel === 1) {
				state.loyalty -= 1;
				state.consumption -= 1;
			} else if (oldLevel === 2) {
				state.loyalty -= 2;
				state.consumption -= 2;
			} else if (oldLevel === 3) {
				state.loyalty -= 3;
				state.consumption -= 4;
			} else if (oldLevel === 4) {
				state.loyalty -= 4;
				state.consumption -= 8;
			}

			if (newLevel === 0) {
				state.loyalty -= 1;
			} else if (newLevel === 1) {
				state.loyalty += 1;
				state.consumption += 1;
			} else if (newLevel === 2) {
				state.loyalty += 2;
				state.consumption += 2;
			} else if (newLevel === 3) {
				state.loyalty += 3;
				state.consumption += 4;
			} else if (newLevel === 4) {
				state.loyalty += 4;
				state.consumption += 8;
			}
		},
		promotionEdictLevelUpdated: (state, action: PayloadAction<number>) => {
			const oldLevel = state.promotionEdictLevel;
			const newLevel = action.payload;

			state.promotionEdictLevel = newLevel;

			if (oldLevel === 0) {
				state.stability += 1;
			} else if (oldLevel === 1) {
				state.stability -= 1;
				state.consumption -= 1;
			} else if (oldLevel === 2) {
				state.stability -= 2;
				state.consumption -= 2;
			} else if (oldLevel === 3) {
				state.stability -= 3;
				state.consumption -= 4;
			} else if (oldLevel === 4) {
				state.stability -= 4;
				state.consumption -= 8;
			}

			if (newLevel === 0) {
				state.stability -= 1;
			} else if (newLevel === 1) {
				state.stability += 1;
				state.consumption += 1;
			} else if (newLevel === 2) {
				state.stability += 2;
				state.consumption += 2;
			} else if (newLevel === 3) {
				state.stability += 3;
				state.consumption += 4;
			} else if (newLevel === 4) {
				state.stability += 4;
				state.consumption += 8;
			}
		},
		taxationEdictLevelUpdated: (state, action: PayloadAction<number>) => {
			const oldLevel = state.taxationEdictLevel;
			const newLevel = action.payload;

			state.taxationEdictLevel = newLevel;

			if (oldLevel === 0) {
				state.loyalty -= 1;
			} else if (oldLevel === 1) {
				state.economy -= 1;
				state.loyalty += 1;
			} else if (oldLevel === 2) {
				state.economy -= 2;
				state.loyalty += 2;
			} else if (oldLevel === 3) {
				state.economy -= 3;
				state.loyalty += 4;
			} else if (oldLevel === 4) {
				state.economy -= 4;
				state.loyalty += 8;
			}

			if (newLevel === 0) {
				state.loyalty += 1;
			} else if (newLevel === 1) {
				state.economy += 1;
				state.loyalty -= 1;
			} else if (newLevel === 2) {
				state.economy += 2;
				state.loyalty -= 2;
			} else if (newLevel === 3) {
				state.economy += 3;
				state.loyalty -= 4;
			} else if (newLevel === 4) {
				state.economy += 4;
				state.loyalty -= 8;
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(
			fetchKingdomData.fulfilled,
			(state, action: PayloadAction<KingdomState>) => {
				const kingdom = action.payload;

				state.alignment = kingdom.alignment;
				state.consumption = kingdom.consumption;
				state.economy = kingdom.economy;
				state.holidayEdictLevel = kingdom.holidayEdictLevel;
				state.loyalty = kingdom.loyalty;
				state.month = kingdom.month;
				state.name = kingdom.name;
				state.promotionEdictLevel = kingdom.promotionEdictLevel;
				state.stability = kingdom.stability;
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
