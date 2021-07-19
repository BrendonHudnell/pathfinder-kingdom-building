import { getRepository } from 'typeorm';

import { KingdomEntity } from '../kingdom';
import { LeadershipEntity } from './leadershipEntity';

export interface LeadershipRole {
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

export const leadershipService = {
	getAllLeadershipRoles,
	addViceroy,
};

async function getAllLeadershipRoles(
	kingdomId: number
): Promise<LeadershipRole[]> {
	const leadershipRepository = getRepository(LeadershipEntity);

	const roles = await leadershipRepository.find({
		where: [{ kingdom: kingdomId }],
	});

	return roles.map((role) => convertLeadershipEntityToLeadershipRole(role));
}

async function addViceroy(
	kingdomId: number
): Promise<LeadershipRole | undefined> {
	const leadershipRepository = getRepository(LeadershipEntity);
	const kingdomRepository = getRepository(KingdomEntity);

	const kingdom = await kingdomRepository.findOne(kingdomId);

	if (!kingdom) {
		return;
	}

	const temp = new LeadershipEntity();
	temp.kingdom = kingdom;
	temp.name = 'Viceroy';
	temp.heldBy = '';
	temp.attribute = 'Intelligence/2';
	temp.abilityBonus = 0;
	temp.leadership = false;
	temp.benefit = 'Economy';
	temp.vacant = true;
	temp.skillBonus = 0;

	const viceroy = await leadershipRepository.save(temp);

	return convertLeadershipEntityToLeadershipRole(viceroy);
}

function convertLeadershipEntityToLeadershipRole(
	leadershipEntity: LeadershipEntity
): LeadershipRole {
	return {
		id: leadershipEntity.id,
		name: leadershipEntity.name,
		heldBy: leadershipEntity.heldBy,
		attribute: leadershipEntity.attribute,
		abilityBonus: leadershipEntity.abilityBonus,
		leadership: leadershipEntity.leadership,
		benefit: leadershipEntity.benefit,
		vacant: leadershipEntity.vacant,
		skillBonus: leadershipEntity.skillBonus,
	};
}
