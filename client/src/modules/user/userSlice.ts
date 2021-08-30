import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
	loggedIn: boolean;
	kingdoms: number[];
}

export const defaultUserState: UserState = {
	loggedIn: false,
	kingdoms: [],
};

export const userSlice = createSlice({
	name: 'user',
	initialState: defaultUserState,
	reducers: {
		login: (state, action: PayloadAction<number[]>) => {
			state.loggedIn = true;
			state.kingdoms = action.payload;
		},
		logout: (state) => {
			state.loggedIn = false;
			state.kingdoms = [];
		},
	},
});

export const { login, logout } = userSlice.actions;

export const userReducer = userSlice.reducer;
