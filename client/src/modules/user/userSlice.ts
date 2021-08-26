import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
	loggedIn: boolean;
}

export const defaultUserState: UserState = {
	loggedIn: false,
};

export const userSlice = createSlice({
	name: 'user',
	initialState: defaultUserState,
	reducers: {
		login: (state) => {
			state.loggedIn = true;
		},
		logout: (state) => {
			state.loggedIn = false;
		},
	},
});

export const { login, logout } = userSlice.actions;

export const userReducer = userSlice.reducer;
