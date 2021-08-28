import { getRepository } from 'typeorm';

import { KingdomEntity } from '../kingdom';
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
	convertHexEntityToHex,
	createHexBoard,
	updateHex,
};

async function getAllHexes(kingdomId: number): Promise<Hex[]> {
	const hexRepository = getRepository(HexEntity);

	const hexes = await hexRepository
		.createQueryBuilder('hex')
		.where({ kingdom: kingdomId })
		.select(['hex', 'settlement.id'])
		.leftJoin('hex.settlement', 'settlement')
		.getMany();

	return hexes.map((hex) => convertHexEntityToHex(hex));
}

function convertHexEntityToHex(hexEntity: HexEntity): Hex {
	const specialTerrain: string[] = [];
	const terrainImprovements: string[] = [];

	if (hexEntity.bridgeSpecialTerrain) {
		specialTerrain.push('Bridge');
	}
	if (hexEntity.building) {
		specialTerrain.push('Building');
	}
	if (hexEntity.freeCity) {
		specialTerrain.push('Free City');
	}
	if (hexEntity.lair) {
		specialTerrain.push('Lair');
	}
	if (hexEntity.landmark) {
		specialTerrain.push('Landmark');
	}
	if (hexEntity.resource) {
		specialTerrain.push('Resource');
	}
	if (hexEntity.river) {
		specialTerrain.push('River');
	}
	if (hexEntity.ruin) {
		specialTerrain.push('Ruin');
	}

	if (hexEntity.aqueduct) {
		terrainImprovements.push('Aqueduct');
	}
	if (hexEntity.bridgeImprovement) {
		terrainImprovements.push('Bridge');
	}
	if (hexEntity.canal) {
		terrainImprovements.push('Canal');
	}
	if (hexEntity.farm) {
		terrainImprovements.push('Farm');
	}
	if (hexEntity.fishery) {
		terrainImprovements.push('Fishery');
	}
	if (hexEntity.fort) {
		terrainImprovements.push('Fort');
	}
	if (hexEntity.highway) {
		terrainImprovements.push('Highway');
	}
	if (hexEntity.mine) {
		terrainImprovements.push('Mine');
	}
	if (hexEntity.quarry) {
		terrainImprovements.push('Quarry');
	}
	if (hexEntity.road) {
		terrainImprovements.push('Road');
	}
	if (hexEntity.sawmill) {
		terrainImprovements.push('Sawmill');
	}
	if (hexEntity.vineyard) {
		terrainImprovements.push('Vineyard');
	}
	if (hexEntity.watchtower) {
		terrainImprovements.push('Watchtower');
	}

	return {
		id: hexEntity.id,
		settlementId: hexEntity.settlement?.id ?? -1,
		name: hexEntity.name,
		terrain: hexEntity.terrain,
		specialTerrain,
		explorationState: hexEntity.explorationState,
		terrainImprovements,
		pointsOfInterest: hexEntity.pointsOfInterest,
		notes: hexEntity.notes,
	};
}

async function createHexBoard(kingdom: KingdomEntity): Promise<HexEntity[]> {
	const hexRepository = getRepository(HexEntity);

	const hexes = Array.from({ length: 90 }, () => {
		const hex = new HexEntity();
		hex.kingdom = kingdom;
		hex.name = 'Hex Name';
		hex.terrain = 'Plains';
		hex.bridgeSpecialTerrain = false;
		hex.building = false;
		hex.freeCity = false;
		hex.lair = false;
		hex.landmark = false;
		hex.resource = false;
		hex.river = false;
		hex.ruin = false;
		hex.explorationState = 'Unexplored';
		hex.aqueduct = false;
		hex.bridgeImprovement = false;
		hex.canal = false;
		hex.farm = false;
		hex.fishery = false;
		hex.fort = false;
		hex.highway = false;
		hex.mine = false;
		hex.quarry = false;
		hex.road = false;
		hex.sawmill = false;
		hex.vineyard = false;
		hex.watchtower = false;
		hex.pointsOfInterest = '';
		hex.notes = '';

		return hex;
	});

	await hexRepository.save(hexes);

	return hexes;
}

async function updateHex(
	id: number,
	updates: Partial<Hex>
): Promise<Hex | undefined> {
	const hexRepository = getRepository(HexEntity);

	const hex = await hexRepository.findOne(id);

	if (!hex) {
		return;
	}

	hex.name = updates.name ?? hex.name;
	hex.terrain = updates.terrain ?? hex.terrain;
	// TODO special terrain
	hex.explorationState = updates.explorationState ?? hex.explorationState;
	// TODO terrain improvements
	hex.pointsOfInterest = updates.pointsOfInterest ?? hex.pointsOfInterest;
	hex.notes = updates.notes ?? hex.notes;

	const updatedHex = await hexRepository.save(hex);

	return convertHexEntityToHex(updatedHex);
}
