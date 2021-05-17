import { useAppSelector } from '../../components/store';
import { HexData, selectClaimedHexes } from './hexSlice';

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
	BRIDGE = 'Bridge',
	BUILDING = 'Building',
	FREE_CITY = 'Free City',
	LAIR = 'Lair',
	LANDMARK = 'Landmark',
	RESOURCE = 'Resource',
	RIVER = 'River',
	RUIN = 'Ruin',
}

export enum TerrainImprovementType {
	AQUEDUCT = 'Aqueduct',
	BRIDGE = 'Bridge',
	CANAL = 'Canal',
	FARM = 'Farm',
	FISHERY = 'Fishery',
	FORT = 'Fort',
	HIGHWAY = 'Highway',
	MINE = 'Mine',
	QUARRY = 'Quarry',
	ROAD = 'Road',
	SAWMILL = 'Sawmill',
	VINEYARD = 'Vineyard',
	WATCHTOWER = 'Watchtower',
}

export function useClaimedHexesEconomyBonus(): number {
	const claimedHexes = useAppSelector((state) => selectClaimedHexes(state));
	let roadTotal = 0;
	let mineTotal = 0;
	let riverTotal = 0;
	let resourceTotal = 0;

	claimedHexes.forEach((hex) => {
		if (hex.terrainImprovements.includes(TerrainImprovementType.MINE)) {
			hex.specialTerrain.includes(SpecialTerrainType.RESOURCE)
				? (mineTotal += 2)
				: mineTotal++;
		}
		if (
			hex.terrainImprovements.includes(TerrainImprovementType.ROAD) ||
			hex.terrainImprovements.includes(TerrainImprovementType.HIGHWAY)
		) {
			roadTotal++;
		}
		if (hex.specialTerrain.includes(SpecialTerrainType.RIVER)) {
			riverTotal++;
		}
		if (hex.specialTerrain.includes(SpecialTerrainType.RESOURCE)) {
			resourceTotal++;
		}
	});

	return (
		mineTotal +
		resourceTotal +
		Math.floor(roadTotal / 4) +
		Math.floor(riverTotal / 4)
	);
}

export function useClaimedHexesLoyaltyBonus(): number {
	const claimedHexes = useAppSelector((state) => selectClaimedHexes(state));
	let aqueductTotal = 0;
	let landmarkTotal = 0;

	claimedHexes.forEach((hex) => {
		if (hex.terrainImprovements.includes(TerrainImprovementType.AQUEDUCT)) {
			aqueductTotal++;
		}
		if (hex.specialTerrain.includes(SpecialTerrainType.LANDMARK)) {
			hex.terrainImprovements.includes(TerrainImprovementType.ROAD) ||
			hex.terrainImprovements.includes(TerrainImprovementType.HIGHWAY)
				? (landmarkTotal += 2)
				: landmarkTotal++;
		}
	});

	return aqueductTotal + landmarkTotal;
}

export function useClaimedHexesStabilityBonus(): number {
	const claimedHexes = useAppSelector((state) => selectClaimedHexes(state));
	let aqueductTotal = 0;
	let fortTotal = 0;
	let roadTotal = 0;
	let quarryTotal = 0;
	let sawmillTotal = 0;
	let watchtwowerTotal = 0;
	let lairTotal = 0;
	let riverTotal = 0;

	claimedHexes.forEach((hex) => {
		if (hex.terrainImprovements.includes(TerrainImprovementType.AQUEDUCT)) {
			aqueductTotal++;
		}
		if (hex.terrainImprovements.includes(TerrainImprovementType.FORT)) {
			fortTotal += 2;
		}
		if (
			hex.terrainImprovements.includes(TerrainImprovementType.ROAD) ||
			hex.terrainImprovements.includes(TerrainImprovementType.HIGHWAY)
		) {
			roadTotal++;
		}
		if (hex.terrainImprovements.includes(TerrainImprovementType.QUARRY)) {
			hex.specialTerrain.includes(SpecialTerrainType.RESOURCE)
				? (quarryTotal += 2)
				: quarryTotal++;
		}
		if (hex.terrainImprovements.includes(TerrainImprovementType.SAWMILL)) {
			hex.specialTerrain.includes(SpecialTerrainType.RESOURCE)
				? (sawmillTotal += 2)
				: sawmillTotal++;
		}
		if (hex.terrainImprovements.includes(TerrainImprovementType.WATCHTOWER)) {
			watchtwowerTotal++;
		}
		if (hex.specialTerrain.includes(SpecialTerrainType.LAIR)) {
			lairTotal++;
		}
		if (hex.specialTerrain.includes(SpecialTerrainType.RIVER)) {
			riverTotal++;
		}
	});

	return (
		aqueductTotal +
		fortTotal +
		quarryTotal +
		sawmillTotal +
		watchtwowerTotal +
		lairTotal +
		Math.floor(roadTotal / 8) +
		Math.floor(riverTotal / 8)
	);
}

export function useClaimedHexesConsumptionDecrease(): number {
	const claimedHexes = useAppSelector((state) => selectClaimedHexes(state));
	let farmTotal = 0;
	let fisheryTotal = 0;
	let vineyardTotal = 0;
	let fortTotal = 0;

	claimedHexes.forEach((hex) => {
		if (hex.terrainImprovements.includes(TerrainImprovementType.FARM)) {
			hex.specialTerrain.includes(SpecialTerrainType.RESOURCE)
				? (farmTotal += 3)
				: (farmTotal += 2);
		}
		if (hex.terrainImprovements.includes(TerrainImprovementType.FISHERY)) {
			hex.specialTerrain.includes(SpecialTerrainType.RESOURCE)
				? (fisheryTotal += 2)
				: fisheryTotal++;
		}
		if (hex.terrainImprovements.includes(TerrainImprovementType.VINEYARD)) {
			hex.specialTerrain.includes(SpecialTerrainType.RESOURCE)
				? (vineyardTotal += 2)
				: vineyardTotal++;
		}
		if (hex.terrainImprovements.includes(TerrainImprovementType.FORT)) {
			fortTotal++;
		}
	});

	return farmTotal + fisheryTotal + vineyardTotal - fortTotal;
}

export function useClaimedHexesTerrainIncome(): number {
	const claimedHexes = useAppSelector((state) => selectClaimedHexes(state));
	let mineTotal = 0;
	let quarryTotal = 0;
	let sawmillTotal = 0;

	claimedHexes.forEach((hex) => {
		if (hex.terrainImprovements.includes(TerrainImprovementType.MINE)) {
			hex.specialTerrain.includes(SpecialTerrainType.RESOURCE)
				? (mineTotal += 2)
				: mineTotal++;
		}
		if (hex.terrainImprovements.includes(TerrainImprovementType.QUARRY)) {
			hex.specialTerrain.includes(SpecialTerrainType.RESOURCE)
				? (quarryTotal += 2)
				: quarryTotal++;
		}
		if (hex.terrainImprovements.includes(TerrainImprovementType.SAWMILL)) {
			hex.specialTerrain.includes(SpecialTerrainType.RESOURCE)
				? (sawmillTotal += 2)
				: sawmillTotal++;
		}
	});

	return mineTotal + quarryTotal + sawmillTotal;
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

export function mapExplorationStateToBorderColor(
	explorationState: ExplorationState
): string {
	switch (explorationState) {
		case ExplorationState.CLAIMED:
		case ExplorationState.SETTLED:
			return 'black';
		case ExplorationState.EXPLORED:
			return 'darkgrey';
		case ExplorationState.CLEARED:
			return 'grey';
		case ExplorationState.UNEXPLORED:
			return 'lightgrey';
		default:
			return '';
	}
}

export function getTerrainImprovements(
	hexData: HexData
): TerrainImprovementType[] {
	const hasRiver = hexData.specialTerrain.includes(SpecialTerrainType.RIVER);
	const hasCanal = hexData.terrainImprovements.includes(
		TerrainImprovementType.CANAL
	);

	const improvements: TerrainImprovementType[] = [];

	// TODO handle bridges?
	// TODO cavern is subterranean, should it have its own type?
	// TODO highway is a road upgrade
	switch (hexData.terrain) {
		case TerrainType.CAVERN:
			improvements.push(TerrainImprovementType.MINE);
			improvements.push(TerrainImprovementType.QUARRY);
			break;
		case TerrainType.COASTLINE:
			improvements.push(TerrainImprovementType.AQUEDUCT);
			improvements.push(TerrainImprovementType.FARM);
			improvements.push(TerrainImprovementType.FISHERY);
			improvements.push(TerrainImprovementType.FORT);
			improvements.push(TerrainImprovementType.ROAD);
			improvements.push(TerrainImprovementType.WATCHTOWER);
			break;
		case TerrainType.DESERT:
			improvements.push(TerrainImprovementType.AQUEDUCT);
			improvements.push(TerrainImprovementType.CANAL);
			if (hasRiver || hasCanal) improvements.push(TerrainImprovementType.FARM);
			if (hasRiver) improvements.push(TerrainImprovementType.FISHERY);
			improvements.push(TerrainImprovementType.FORT);
			improvements.push(TerrainImprovementType.MINE);
			improvements.push(TerrainImprovementType.ROAD);
			improvements.push(TerrainImprovementType.WATCHTOWER);
			break;
		case TerrainType.FOREST:
			improvements.push(TerrainImprovementType.AQUEDUCT);
			if (hasRiver) improvements.push(TerrainImprovementType.FISHERY);
			improvements.push(TerrainImprovementType.FORT);
			improvements.push(TerrainImprovementType.ROAD);
			improvements.push(TerrainImprovementType.SAWMILL);
			improvements.push(TerrainImprovementType.WATCHTOWER);
			break;
		case TerrainType.HILLS:
			improvements.push(TerrainImprovementType.AQUEDUCT);
			improvements.push(TerrainImprovementType.CANAL);
			improvements.push(TerrainImprovementType.FARM);
			if (hasRiver) improvements.push(TerrainImprovementType.FISHERY);
			improvements.push(TerrainImprovementType.FORT);
			improvements.push(TerrainImprovementType.MINE);
			improvements.push(TerrainImprovementType.QUARRY);
			improvements.push(TerrainImprovementType.ROAD);
			improvements.push(TerrainImprovementType.VINEYARD);
			improvements.push(TerrainImprovementType.WATCHTOWER);
			break;
		case TerrainType.JUNGLE:
			improvements.push(TerrainImprovementType.AQUEDUCT);
			if (hasRiver) improvements.push(TerrainImprovementType.FISHERY);
			improvements.push(TerrainImprovementType.FORT);
			improvements.push(TerrainImprovementType.ROAD);
			improvements.push(TerrainImprovementType.SAWMILL);
			improvements.push(TerrainImprovementType.WATCHTOWER);
			break;
		case TerrainType.MARSH:
			improvements.push(TerrainImprovementType.AQUEDUCT);
			improvements.push(TerrainImprovementType.FISHERY);
			improvements.push(TerrainImprovementType.FORT);
			improvements.push(TerrainImprovementType.ROAD);
			improvements.push(TerrainImprovementType.WATCHTOWER);
			break;
		case TerrainType.MOUNTAINS:
			improvements.push(TerrainImprovementType.AQUEDUCT);
			if (hasRiver) improvements.push(TerrainImprovementType.FISHERY);
			improvements.push(TerrainImprovementType.FORT);
			improvements.push(TerrainImprovementType.MINE);
			improvements.push(TerrainImprovementType.QUARRY);
			improvements.push(TerrainImprovementType.ROAD);
			improvements.push(TerrainImprovementType.WATCHTOWER);
			break;
		case TerrainType.PLAINS:
			improvements.push(TerrainImprovementType.AQUEDUCT);
			improvements.push(TerrainImprovementType.CANAL);
			improvements.push(TerrainImprovementType.FARM);
			if (hasRiver) improvements.push(TerrainImprovementType.FISHERY);
			improvements.push(TerrainImprovementType.FORT);
			improvements.push(TerrainImprovementType.ROAD);
			improvements.push(TerrainImprovementType.WATCHTOWER);
			break;
		case TerrainType.WATER:
			improvements.push(TerrainImprovementType.AQUEDUCT);
			improvements.push(TerrainImprovementType.FISHERY);
			break;
	}

	return improvements;
}

// TODO remove after hooking up DB
function generateHexes(): HexData[] {
	const hexes: HexData[] = [];

	for (let i = 0; i < 96; i++) {
		hexes.push({
			id: i,
			name: `Hex Name`,
			terrain: TerrainType.PLAINS,
			specialTerrain: [],
			explorationState: ExplorationState.UNEXPLORED,
			settlementId: -1,
			terrainImprovements: [],
			pointsOfInterest: '',
			notes: '',
		});
	}

	return hexes;
}

export const initialHexes: HexData[] = generateHexes();
