import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
	EntityId,
	PayloadAction,
} from '@reduxjs/toolkit';

import { RootState } from '../../components/store';
// import { initialRoles } from './leadershipUtils';

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
	async (roles: Role[]) => {
		return roles;
	}
);

export const viceroyAdded = createAsyncThunk(
	// TODO fix when server is hooked up
	'leadership/viceroyAdded',
	async (_, thunkApi) => {
		const state = thunkApi.getState() as RootState;

		const viceroy: Role = {
			id: state.leadership.ids.length + 1,
			name: 'Viceroy',
			heldBy: '',
			attribute: 'Intelligence/2',
			abilityBonus: 0,
			leadership: false,
			benefit: 'Economy',
			vacant: true,
		};

		return viceroy;
	}
);

export const leadershipSlice = createSlice({
	name: 'leadership',
	initialState,
	reducers: {
		vacantToggled: (state, action: PayloadAction<EntityId>) => {
			const id = action.payload;
			const role = state.entities[id];
			if (role) {
				role.vacant = !role.vacant;
			}
		},
		heldByUpdated: (
			state,
			action: PayloadAction<{ id: EntityId; heldBy: string }>
		) => {
			const { id, heldBy } = action.payload;
			const role = state.entities[id];
			if (role) {
				role.heldBy = heldBy;
			}
		},
		attributeUpdated: (
			state,
			action: PayloadAction<{ id: EntityId; attribute: string }>
		) => {
			const { id, attribute } = action.payload;
			const role = state.entities[id];
			if (role) {
				role.attribute = attribute;
			}
		},
		abilityBonusUpdated: (
			state,
			action: PayloadAction<{ id: EntityId; abilityBonus: number }>
		) => {
			const { id, abilityBonus } = action.payload;
			const role = state.entities[id];
			if (role) {
				role.abilityBonus = abilityBonus;
			}
		},
		leadershipToggled: (state, action: PayloadAction<EntityId>) => {
			const id = action.payload;
			const role = state.entities[id];
			if (role) {
				role.leadership = !role.leadership;
			}
		},
		benefitUpdated: (
			state,
			action: PayloadAction<{ id: EntityId; benefit: string }>
		) => {
			const { id, benefit } = action.payload;
			const role = state.entities[id];
			if (role) {
				role.benefit = benefit;
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
				(state, action: PayloadAction<Role>) => {
					leadershipAdapter.addOne(state, action.payload);
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
} = leadershipSlice.actions;

export const {
	selectAll: selectAllRoles,
} = leadershipAdapter.getSelectors<RootState>((state) => state.leadership);

export const leadershipReducer = leadershipSlice.reducer;
