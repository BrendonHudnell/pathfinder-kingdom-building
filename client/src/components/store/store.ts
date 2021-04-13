import { configureStore, ThunkAction, AnyAction } from '@reduxjs/toolkit';
import { kingdomReducer } from '../../modules/kingdom';

export const store = configureStore({
	reducer: {
		kingdom: kingdomReducer,
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
