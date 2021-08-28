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
	generateLeadershipRoles,
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

async function generateLeadershipRoles(kingdom: KingdomEntity): Promise<void> {
	const leadershipRepo = getRepository(LeadershipEntity);

	const roles = Array.from({ length: 13 }, (_, i) => {
		const role = new LeadershipEntity();
		role.kingdom = kingdom;
		role.name = roleNames[i].name;
		role.heldBy = '';
		role.attribute = roleNames[i].attribute;
		role.abilityBonus = 0;
		role.leadership = false;
		role.benefit = roleNames[i].benefit;
		role.vacant = true;
		role.skillBonus = 0;

		return role;
	});

	await leadershipRepo.save(roles);
}

interface Role {
	name: string;
	attribute: string;
	benefit: string;
}

const roleNames: Role[] = [
	{ name: 'Ruler', attribute: 'Charisma', benefit: 'Economy' },
	{ name: 'Consort', attribute: 'Charisma/2', benefit: 'Loyalty' },
	{ name: 'Councilor', attribute: 'Charisma', benefit: 'Loyalty' },
	{ name: 'General', attribute: 'Charisma', benefit: 'Stability' },
	{ name: 'Grand Diplomat', attribute: 'Charisma', benefit: 'Stability' },
	{ name: 'Heir', attribute: 'Charisma/2', benefit: 'Loyalty' },
	{ name: 'High Priest', attribute: 'Charisma', benefit: 'Stability' },
	{ name: 'Magister', attribute: 'Charisma', benefit: 'Economy' },
	{ name: 'Marshal', attribute: 'Dexterity', benefit: 'Economy' },
	{ name: 'Royal Enforcer', attribute: 'Dexterity', benefit: 'Loyalty' },
	{ name: 'Spymaster', attribute: 'Dexterity', benefit: 'Economy' },
	{ name: 'Treasurer', attribute: 'Intelligence', benefit: 'Economy' },
	{ name: 'Warden', attribute: 'Constitution', benefit: 'Loyalty' },
];
