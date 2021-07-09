import { configureStore, ThunkAction, AnyAction } from '@reduxjs/toolkit';

import { districtReducer } from '../../modules/district';
import { eventsReducer } from '../../modules/events';
import { hexReducer } from '../../modules/hex';
import { kingdomReducer } from '../../modules/kingdom';
import { leadershipReducer } from '../../modules/leadership';
import { settlementReducer } from '../../modules/settlement';

export const store = configureStore({
	reducer: {
		kingdom: kingdomReducer,
		leadership: leadershipReducer,
		settlement: settlementReducer,
		district: districtReducer,
		hex: hexReducer,
		events: eventsReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	AnyAction
>;
