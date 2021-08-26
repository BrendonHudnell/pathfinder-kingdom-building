import { configureStore, ThunkAction, AnyAction } from '@reduxjs/toolkit';

import { districtReducer } from '../../modules/district';
import { hexReducer } from '../../modules/hex';
import { kingdomReducer } from '../../modules/kingdom';
import { leadershipReducer } from '../../modules/leadership';
import { settlementReducer } from '../../modules/settlement';
import { userReducer } from '../../modules/user';

export const store = configureStore({
	reducer: {
		kingdom: kingdomReducer,
		leadership: leadershipReducer,
		settlement: settlementReducer,
		district: districtReducer,
		hex: hexReducer,
		user: userReducer,
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
