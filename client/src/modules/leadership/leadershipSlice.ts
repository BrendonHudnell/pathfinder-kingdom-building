import { createSlice } from '@reduxjs/toolkit';

export interface LeadershipState {
	dummy: string;
}

const initialState: LeadershipState = {
	dummy: 'dummy',
};

export const leadershipSlice = createSlice({
	name: 'leadership',
	initialState,
	reducers: {
		dummy: (state) => {
			state.dummy = 'dummy';
		},
	},
});

// export const {

// } = leadershipSlice.actions;

export const leadershipReducer = leadershipSlice.reducer;
