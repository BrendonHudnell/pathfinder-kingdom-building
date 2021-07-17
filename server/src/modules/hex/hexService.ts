import { getRepository } from 'typeorm';

import { HexEntity } from './hexEntity';

export interface Hex {
	id: number;
	settlementId: number;
	name: string;
	terrain: string;
	specialTerrain: string[];
	explorationState: string;
	terrainImprovements: string[];
	pointsOfInterest: string;
	notes: string;
}

export const hexService = {
	getAllHexes,
};

async function getAllHexes(kingdomId: number): Promise<Hex[]> {
	const hexRepository = getRepository(HexEntity);

	const hexes = await hexRepository
		.createQueryBuilder('hex')
		.where({ kingdom: kingdomId })
		.select(['hex', 'settlement.id'])
		.leftJoin('hex.settlement', 'settlement')
		.getMany();

	return hexes.map((hex) => {
		const specialTerrain: string[] = [];
		const terrainImprovements: string[] = [];

		if (hex.bridgeSpecialTerrain) {
			specialTerrain.push('Bridge');
		}
		if (hex.building) {
			specialTerrain.push('Building');
		}
		if (hex.freeCity) {
			specialTerrain.push('Free City');
		}
		if (hex.lair) {
			specialTerrain.push('Lair');
		}
		if (hex.landmark) {
			specialTerrain.push('Landmark');
		}
		if (hex.resource) {
			specialTerrain.push('Resource');
		}
		if (hex.river) {
			specialTerrain.push('River');
		}
		if (hex.ruin) {
			specialTerrain.push('Ruin');
		}

		if (hex.aqueduct) {
			terrainImprovements.push('Aqueduct');
		}
		if (hex.bridgeImprovement) {
			terrainImprovements.push('Bridge');
		}
		if (hex.canal) {
			terrainImprovements.push('Canal');
		}
		if (hex.farm) {
			terrainImprovements.push('Farm');
		}
		if (hex.fishery) {
			terrainImprovements.push('Fishery');
		}
		if (hex.fort) {
			terrainImprovements.push('Fort');
		}
		if (hex.highway) {
			terrainImprovements.push('Highway');
		}
		if (hex.mine) {
			terrainImprovements.push('Mine');
		}
		if (hex.quarry) {
			terrainImprovements.push('Quarry');
		}
		if (hex.road) {
			terrainImprovements.push('Road');
		}
		if (hex.sawmill) {
			terrainImprovements.push('Sawmill');
		}
		if (hex.vineyard) {
			terrainImprovements.push('Vineyard');
		}
		if (hex.watchtower) {
			terrainImprovements.push('Watchtower');
		}

		return {
			id: hex.id,
			settlementId: hex.settlement?.id,
			name: hex.name,
			terrain: hex.terrain,
			specialTerrain,
			explorationState: hex.explorationState,
			terrainImprovements,
			pointsOfInterest: hex.pointsOfInterest ?? '',
			notes: hex.notes ?? '',
		};
	});
}
