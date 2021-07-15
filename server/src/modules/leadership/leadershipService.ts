import { getRepository } from 'typeorm';

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
};

async function getAllLeadershipRoles(
	kingdomId: number
): Promise<LeadershipRole[] | undefined> {
	const leadershipRepository = getRepository(LeadershipEntity);

	const roles = await leadershipRepository.find({
		where: [{ kingdom: kingdomId }],
	});

	if (roles) {
		return roles.map((role) => {
			return {
				id: role.id,
				name: role.name,
				heldBy: role.heldBy,
				attribute: role.attribute,
				abilityBonus: role.abilityBonus,
				leadership: role.leadership,
				benefit: role.benefit,
				vacant: role.vacant,
				skillBonus: role.skillBonus,
			};
		});
	}

	return undefined;
}
