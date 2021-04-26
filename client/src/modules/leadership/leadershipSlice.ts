import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit';

import { RootState } from '../../components/store';
import { initialRoles } from './leadershipUtils';

export interface Role {
	id: number;
	name: string;
	heldBy: string;
	attribute: string;
	abilityBonus: number;
	leadership: boolean;
	benefit: string;
	vacant: boolean;
}

const leadershipAdapter = createEntityAdapter<Role>();

const initialState = leadershipAdapter.getInitialState();

export const fetchLeadershipRoles = createAsyncThunk(
	// TODO fix when server is hooked up
	'leadership/fetchLeadershipRoles',
	async () => {
		return initialRoles;
	}
);

export const leadershipSlice = createSlice({
	name: 'leadership',
	initialState,
	reducers: {
		vacantToggled: (state, action: PayloadAction<number>) => {
			const id = action.payload;
			const role = state.entities[id];
			if (role) {
				role.vacant = !role.vacant;
			}
		},
		heldByUpdated: (
			state,
			action: PayloadAction<{ id: number; heldBy: string }>
		) => {
			const { id, heldBy } = action.payload;
			const role = state.entities[id];
			if (role) {
				role.heldBy = heldBy;
			}
		},
		attributeUpdated: (
			state,
			action: PayloadAction<{ id: number; attribute: string }>
		) => {
			const { id, attribute } = action.payload;
			const role = state.entities[id];
			if (role) {
				role.attribute = attribute;
			}
		},
		abilityBonusUpdated: (
			state,
			action: PayloadAction<{ id: number; abilityBonus: number }>
		) => {
			const { id, abilityBonus } = action.payload;
			const role = state.entities[id];
			if (role) {
				role.abilityBonus = abilityBonus;
			}
		},
		leadershipToggled: (state, action: PayloadAction<number>) => {
			const id = action.payload;
			const role = state.entities[id];
			if (role) {
				role.leadership = !role.leadership;
			}
		},
		benefitUpdated: (
			state,
			action: PayloadAction<{ id: number; benefit: string }>
		) => {
			const { id, benefit } = action.payload;
			const role = state.entities[id];
			if (role) {
				role.benefit = benefit;
			}
		},
		viceroyAdded: leadershipAdapter.addOne,
	},
	extraReducers: (builder) => {
		builder.addCase(
			fetchLeadershipRoles.fulfilled,
			(state, action: PayloadAction<Role[]>) => {
				leadershipAdapter.setAll(state, action.payload);
			}
		);
	},
});

export const {
	vacantToggled,
	heldByUpdated,
	attributeUpdated,
	abilityBonusUpdated,
	leadershipToggled,
	benefitUpdated,
	viceroyAdded,
} = leadershipSlice.actions;

export const {
	selectAll: selectAllRoles,
} = leadershipAdapter.getSelectors<RootState>((state) => state.leadership);

export const leadershipReducer = leadershipSlice.reducer;
