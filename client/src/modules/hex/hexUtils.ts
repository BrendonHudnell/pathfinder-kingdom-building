import { HexData } from './hexSlice';

export enum TerrainType {
	CAVERN = 'Cavern',
	COASTLINE = 'Coastline',
	DESERT = 'Desert',
	FOREST = 'Forest',
	HILLS = 'Hills',
	JUNGLE = 'Jungle',
	MARSH = 'Marsh',
	MOUNTAINS = 'Mountains',
	PLAINS = 'Plains',
	WATER = 'Water',
}

export enum ExplorationState {
	UNEXPLORED = 'Unexplored',
	EXPLORED = 'Explored',
	CLEARED = 'Cleared',
	CLAIMED = 'Claimed',
	SETTLED = 'Settled',
}

export enum SpecialTerrainType {
	NONE = 'None',
	BRIDGE = 'Bridge',
	BUILDING = 'Building',
	FREE_CITY = 'Free City',
	LAIR = 'Lair',
	LANDMARK = 'Landmark',
	RESOURCE = 'Resource',
	RIVER = 'River',
	RUIN = 'Ruin',
}

export function mapTerrainToColor(terrain: TerrainType): string {
	switch (terrain) {
		case TerrainType.CAVERN:
			return 'brown';
		case TerrainType.COASTLINE:
			return 'lightblue';
		case TerrainType.DESERT:
			return 'tan';
		case TerrainType.FOREST:
			return 'forestgreen';
		case TerrainType.HILLS:
			return 'orange';
		case TerrainType.JUNGLE:
			return 'darkgreen';
		case TerrainType.MARSH:
			return 'olive';
		case TerrainType.MOUNTAINS:
			return 'darkgrey';
		case TerrainType.PLAINS:
			return 'darkkhaki';
		case TerrainType.WATER:
			return 'blue';
		default:
			return '';
	}
}

// TODO remove after hooking up DB
function generateHexes(): HexData[] {
	const hexes: HexData[] = [];

	for (let i = 0; i < 96; i++) {
		hexes.push({
			id: i,
			name: `Hex Name`,
			terrain: TerrainType.PLAINS,
			specialTerrain: SpecialTerrainType.NONE,
			explorationState: ExplorationState.UNEXPLORED,
			settlementId: -1,
			pointsOfInterest: '',
			notes: '',
		});
	}

	return hexes;
}

export const initialHexes: HexData[] = generateHexes();
