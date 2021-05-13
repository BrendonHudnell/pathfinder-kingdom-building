import {
	createAsyncThunk,
	createEntityAdapter,
	createSelector,
	createSlice,
	EntityId,
	PayloadAction,
} from '@reduxjs/toolkit';

import { RootState } from '../../components/store';
import {
	ExplorationState,
	SpecialTerrainType,
	TerrainImprovementType,
	TerrainType,
} from './hexUtils';

export interface HexData {
	id: EntityId;
	name: string;
	terrain: TerrainType;
	specialTerrain: SpecialTerrainType[];
	explorationState: ExplorationState;
	settlementId: EntityId;
	terrainImprovements: TerrainImprovementType[];
	pointsOfInterest: string;
	notes: string;
}

const hexAdapter = createEntityAdapter<HexData>();

const initialState = hexAdapter.getInitialState();

export const fetchHexes = createAsyncThunk(
	// TODO fix when server is hooked up
	'hex/fetchHexes',
	async (hexes: HexData[]) => {
		return hexes;
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
		terrainImprovementAdded: (
			state,
			action: PayloadAction<{
				hexId: EntityId;
				terrainImprovement: TerrainImprovementType;
			}>
		) => {
			const { hexId, terrainImprovement } = action.payload;

			if (
				state.ids.includes(hexId) &&
				!state.entities[hexId]!.terrainImprovements.includes(terrainImprovement)
			) {
				state.entities[hexId]!.terrainImprovements.push(terrainImprovement);
			}
		},
		terrainImprovementRemoved: (
			state,
			action: PayloadAction<{
				hexId: EntityId;
				terrainImprovement: TerrainImprovementType;
			}>
		) => {
			const { hexId, terrainImprovement } = action.payload;

			if (state.ids.includes(hexId)) {
				const index = state.entities[hexId]!.terrainImprovements.indexOf(
					terrainImprovement
				);
				if (index > -1) {
					state.entities[hexId]!.terrainImprovements.splice(index, 1);
				}
			}
		},
		specialTerrainAdded: (
			state,
			action: PayloadAction<{
				hexId: EntityId;
				specialTerrain: SpecialTerrainType;
			}>
		) => {
			const { hexId, specialTerrain } = action.payload;

			if (
				state.ids.includes(hexId) &&
				!state.entities[hexId]!.specialTerrain.includes(specialTerrain)
			) {
				state.entities[hexId]!.specialTerrain.push(specialTerrain);
			}
		},
		specialTerrainRemoved: (
			state,
			action: PayloadAction<{
				hexId: EntityId;
				specialTerrain: SpecialTerrainType;
			}>
		) => {
			const { hexId, specialTerrain } = action.payload;

			if (state.ids.includes(hexId)) {
				const index = state.entities[hexId]!.specialTerrain.indexOf(
					specialTerrain
				);
				if (index > -1) {
					state.entities[hexId]!.specialTerrain.splice(index, 1);
				}
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
		pointsOfInterestUpdated: (
			state,
			action: PayloadAction<{ hexId: EntityId; pointsOfInterest: string }>
		) => {
			const { hexId, pointsOfInterest } = action.payload;

			if (state.ids.includes(hexId)) {
				state.entities[hexId]!.pointsOfInterest = pointsOfInterest;
			}
		},
		notesUpdated: (
			state,
			action: PayloadAction<{ hexId: EntityId; notes: string }>
		) => {
			const { hexId, notes } = action.payload;

			if (state.ids.includes(hexId)) {
				state.entities[hexId]!.notes = notes;
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
	terrainImprovementAdded,
	terrainImprovementRemoved,
	specialTerrainAdded,
	specialTerrainRemoved,
	explorationStateUpdated,
	settlementIdUpdated,
	pointsOfInterestUpdated,
	notesUpdated,
} = hexSlice.actions;

export const {
	selectAll: selectAllHexes,
	selectById: selectHexById,
} = hexAdapter.getSelectors<RootState>((state) => state.hex);

export const selectClaimedHexes = createSelector([selectAllHexes], (hexes) =>
	hexes.filter(
		(hex) =>
			hex.explorationState === ExplorationState.CLAIMED ||
			hex.explorationState === ExplorationState.SETTLED
	)
);

export const hexReducer = hexSlice.reducer;
