import { configureStore, ThunkAction, AnyAction } from '@reduxjs/toolkit';
import { kingdomReducer } from '../../modules/kingdom';
import { leadershipReducer } from '../../modules/leadership';

export const store = configureStore({
	reducer: {
		kingdom: kingdomReducer,
		leadership: leadershipReducer,
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
