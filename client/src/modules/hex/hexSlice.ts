import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
	EntityId,
	PayloadAction,
} from '@reduxjs/toolkit';

import { RootState } from '../../components/store';
import {
	ExplorationState,
	initialHexes,
	SpecialTerrainType,
	TerrainType,
} from './hexUtils';

export interface HexData {
	id: EntityId;
	name: string;
	terrain: TerrainType;
	specialTerrain: SpecialTerrainType;
	explorationState: ExplorationState;
	settlementId: EntityId;
	pointsOfInterest: string;
	notes: string;
}

const hexAdapter = createEntityAdapter<HexData>();

const initialState = hexAdapter.getInitialState();

export const fetchHexes = createAsyncThunk(
	// TODO fix when server is hooked up
	'hex/fetchHexes',
	async () => {
		return initialHexes;
	}
);

export const hexSlice = createSlice({
	name: 'hex',
	initialState,
	reducers: {
		terrainUpdated: (
			state,
			action: PayloadAction<{ hexId: EntityId; terrain: TerrainType }>
		) => {
			const { hexId, terrain } = action.payload;

			if (state.ids.includes(hexId)) {
				state.entities[hexId]!.terrain = terrain;
			}
		},
		nameUpdated: (
			state,
			action: PayloadAction<{ hexId: EntityId; name: string }>
		) => {
			const { hexId, name } = action.payload;

			if (state.ids.includes(hexId)) {
				state.entities[hexId]!.name = name;
			}
		},
		explorationStateUpdated: (
			state,
			action: PayloadAction<{
				hexId: EntityId;
				explorationState: ExplorationState;
			}>
		) => {
			const { hexId, explorationState } = action.payload;

			if (state.ids.includes(hexId)) {
				state.entities[hexId]!.explorationState = explorationState;
			}
		},
		specialTerrainUpdated: (
			state,
			action: PayloadAction<{
				hexId: EntityId;
				specialTerrain: SpecialTerrainType;
			}>
		) => {
			const { hexId, specialTerrain } = action.payload;

			if (state.ids.includes(hexId)) {
				state.entities[hexId]!.specialTerrain = specialTerrain;
			}
		},
		settlementIdUpdated: (
			state,
			action: PayloadAction<{ hexId: EntityId; settlementId: EntityId }>
		) => {
			const { hexId, settlementId } = action.payload;

			if (state.ids.includes(hexId)) {
				state.entities[hexId]!.settlementId = settlementId;
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(
			fetchHexes.fulfilled,
			(state, action: PayloadAction<HexData[]>) => {
				hexAdapter.setAll(state, action.payload);
			}
		);
	},
});

export const {
	terrainUpdated,
	nameUpdated,
	specialTerrainUpdated,
	explorationStateUpdated,
	settlementIdUpdated,
} = hexSlice.actions;

export const {
	selectAll: selectAllHexes,
	selectById: selectHexById,
} = hexAdapter.getSelectors<RootState>((state) => state.hex);

export const hexReducer = hexSlice.reducer;
