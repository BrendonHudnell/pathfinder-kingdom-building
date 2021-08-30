import { getRepository } from 'typeorm';

import { UserEntity } from '../user';
import { KingdomEntity } from './kingdomEntity';

export interface Kingdom {
	id: number;
	name: string;
	alignment: string;
	month: number;
	treasury: number;
	unrest: number;
	holidayEdict: string;
	promotionEdict: string;
	taxationEdict: string;
	fame: {
		1: {
			set: boolean;
			value: string;
		};
		11: {
			set: boolean;
			value: string;
		};
		26: {
			set: boolean;
			value: string;
		};
		51: {
			set: boolean;
			value: string;
		};
		101: {
			set: boolean;
			value: string;
		};
		201: {
			set: boolean;
			value: string;
		};
	};
	government: string;
	options: {
		settlementModifiers: boolean;
		settlementGovernment: boolean;
		kingdomModifiers: boolean;
		kingdomGovernment: boolean;
		kingdomFame: boolean;
		leadershipSkills: boolean;
	};
}

export const kingdomService = {
	getKingdom,
	createKingdom,
	updateKingdom,
};

async function getKingdom(kingdomId: number): Promise<Kingdom | undefined> {
	const kingdomRepository = getRepository(KingdomEntity);

	const kingdom = await kingdomRepository.findOne(kingdomId);

	if (kingdom) {
		return {
			id: kingdom.id,
			name: kingdom.name,
			alignment: kingdom.alignment,
			month: kingdom.month,
			treasury: kingdom.treasury,
			unrest: kingdom.unrest,
			holidayEdict: kingdom.holidayEdict,
			promotionEdict: kingdom.promotionEdict,
			taxationEdict: kingdom.taxationEdict,
			fame: {
				1: {
					set: kingdom.fame1Set,
					value: kingdom.fame1Value,
				},
				11: {
					set: kingdom.fame11Set,
					value: kingdom.fame11Value,
				},
				26: {
					set: kingdom.fame26Set,
					value: kingdom.fame26Value,
				},
				51: {
					set: kingdom.fame51Set,
					value: kingdom.fame51Value,
				},
				101: {
					set: kingdom.fame101Set,
					value: kingdom.fame101Value,
				},
				201: {
					set: kingdom.fame201Set,
					value: kingdom.fame201Value,
				},
			},
			government: kingdom.government,
			options: {
				settlementModifiers: kingdom.settlementModifiers,
				settlementGovernment: kingdom.settlementGovernment,
				kingdomModifiers: kingdom.kingdomModifiers,
				kingdomGovernment: kingdom.kingdomGovernment,
				kingdomFame: kingdom.kingdomFame,
				leadershipSkills: kingdom.leadershipSkills,
			},
		};
	}

	return undefined;
}

async function createKingdom(user: UserEntity): Promise<KingdomEntity> {
	const kingdomRepository = getRepository(KingdomEntity);

	const newKingdom = new KingdomEntity();
	newKingdom.user = user;
	newKingdom.name = 'Untitled';
	newKingdom.alignment = 'Neutral';
	newKingdom.month = 1;
	newKingdom.treasury = 0;
	newKingdom.unrest = 0;
	newKingdom.holidayEdict = 'None';
	newKingdom.promotionEdict = 'None';
	newKingdom.taxationEdict = 'None';
	newKingdom.fame1Set = false;
	newKingdom.fame1Value = 'none';
	newKingdom.fame11Set = false;
	newKingdom.fame11Value = 'none';
	newKingdom.fame26Set = false;
	newKingdom.fame26Value = 'none';
	newKingdom.fame51Set = false;
	newKingdom.fame51Value = 'none';
	newKingdom.fame101Set = false;
	newKingdom.fame101Value = 'none';
	newKingdom.fame201Set = false;
	newKingdom.fame201Value = 'none';
	newKingdom.government = 'Feudal Monarchy';
	newKingdom.settlementModifiers = false;
	newKingdom.settlementGovernment = false;
	newKingdom.kingdomModifiers = false;
	newKingdom.kingdomGovernment = false;
	newKingdom.kingdomFame = false;
	newKingdom.leadershipSkills = false;

	const kingdom = await kingdomRepository.save(newKingdom);

	return kingdom;
}

async function updateKingdom(
	id: number,
	updates: Partial<Kingdom>
): Promise<boolean> {
	const kingdomRepository = getRepository(KingdomEntity);

	const kingdom = await kingdomRepository.findOne(id);

	if (!kingdom) {
		return false;
	}

	kingdom.name = updates.name ?? kingdom.name;
	kingdom.alignment = updates.alignment ?? kingdom.alignment;
	kingdom.month = updates.month ?? kingdom.month;
	kingdom.treasury = updates.treasury ?? kingdom.treasury;
	kingdom.unrest = updates.unrest ?? kingdom.unrest;
	kingdom.holidayEdict = updates.holidayEdict ?? kingdom.holidayEdict;
	kingdom.promotionEdict = updates.promotionEdict ?? kingdom.promotionEdict;
	kingdom.taxationEdict = updates.taxationEdict ?? kingdom.taxationEdict;
	kingdom.fame1Set = updates.fame?.[1].set ?? kingdom.fame1Set;
	kingdom.fame1Value = updates.fame?.[1].value ?? kingdom.fame1Value;
	kingdom.fame11Set = updates.fame?.[11].set ?? kingdom.fame11Set;
	kingdom.fame11Value = updates.fame?.[11].value ?? kingdom.fame11Value;
	kingdom.fame26Set = updates.fame?.[26].set ?? kingdom.fame26Set;
	kingdom.fame26Value = updates.fame?.[26].value ?? kingdom.fame26Value;
	kingdom.fame51Set = updates.fame?.[51].set ?? kingdom.fame51Set;
	kingdom.fame51Value = updates.fame?.[51].value ?? kingdom.fame51Value;
	kingdom.fame101Set = updates.fame?.[101].set ?? kingdom.fame101Set;
	kingdom.fame101Value = updates.fame?.[101].value ?? kingdom.fame101Value;
	kingdom.fame201Set = updates.fame?.[201].set ?? kingdom.fame201Set;
	kingdom.fame201Value = updates.fame?.[201].value ?? kingdom.fame201Value;
	kingdom.government = updates.government ?? kingdom.government;
	kingdom.settlementModifiers =
		updates.options?.settlementModifiers ?? kingdom.settlementModifiers;
	kingdom.settlementGovernment =
		updates.options?.settlementGovernment ?? kingdom.settlementGovernment;
	kingdom.kingdomModifiers =
		updates.options?.kingdomModifiers ?? kingdom.kingdomModifiers;
	kingdom.kingdomGovernment =
		updates.options?.kingdomGovernment ?? kingdom.kingdomGovernment;
	kingdom.kingdomFame = updates.options?.kingdomFame ?? kingdom.kingdomFame;
	kingdom.leadershipSkills =
		updates.options?.leadershipSkills ?? kingdom.leadershipSkills;

	await kingdomRepository.save(kingdom);

	return true;
}
