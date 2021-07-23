import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit';

import { RootState } from '../../components/store';
import { leadershipApi } from './leadershipApi';

export interface Role {
	id: number;
	name: string;
	heldBy: string;
	attribute: string;
	abilityBonus: number;
	leadership: boolean;
	benefit: string;
	vacant: boolean;
	skillBonus: number;
}

const leadershipAdapter = createEntityAdapter<Role>({
	sortComparer: (a, b) => (a.id < b.id ? -1 : a.id === b.id ? 0 : 1),
});

const initialState = leadershipAdapter.getInitialState();

export const fetchLeadershipRoles = createAsyncThunk(
	'leadership/fetchLeadershipRoles',
	async (kingdomId: number) => {
		const roles = leadershipApi.getAllRoles(kingdomId);
		return roles;
	}
);

export const viceroyAdded = createAsyncThunk(
	'leadership/viceroyAdded',
	async (kingdomId: number) => {
		const viceroy = leadershipApi.addViceroy(kingdomId);

		return viceroy;
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
		skillBonusUpdated: (
			state,
			action: PayloadAction<{ id: number; skillBonus: number }>
		) => {
			const { id, skillBonus } = action.payload;
			const role = state.entities[id];
			if (role) {
				role.skillBonus = skillBonus;
			}
		},
		secondRulerToggled: leadershipAdapter.updateOne,
		viceroyDeleted: leadershipAdapter.removeOne,
	},
	extraReducers: (builder) => {
		builder.addCase(
			fetchLeadershipRoles.fulfilled,
			(state, action: PayloadAction<Role[]>) => {
				leadershipAdapter.setAll(state, action.payload);
			}
		),
			builder.addCase(
				viceroyAdded.fulfilled,
				(state, action: PayloadAction<Role | undefined>) => {
					if (action.payload) {
						leadershipAdapter.addOne(state, action.payload);
					}
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
	secondRulerToggled,
	viceroyDeleted,
	skillBonusUpdated,
} = leadershipSlice.actions;

export const { selectAll: selectAllRoles } =
	leadershipAdapter.getSelectors<RootState>((state) => state.leadership);

export const leadershipReducer = leadershipSlice.reducer;
