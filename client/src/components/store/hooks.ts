import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { RootState, AppDispatch } from './store';

export const useAppDispatch = (): ThunkDispatch<any, null, AnyAction> &
	ThunkDispatch<any, undefined, AnyAction> &
	Dispatch<AnyAction> => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
