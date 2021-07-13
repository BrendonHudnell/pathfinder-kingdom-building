import { getRepository } from 'typeorm';
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
