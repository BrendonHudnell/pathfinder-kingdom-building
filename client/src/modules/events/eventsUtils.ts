import { ReactElement } from 'react';

import { ArchaeologicalFind } from './eventViews';

export enum EventType {
	BENEFICIAL_KINGDOM = 'Beneficial kingdom event',
	DANGEROUS_KINGDOM = 'Dangerous kingdom event',
	BENEFICIAL_SETTLEMENT = 'Beneficial settlement event',
	DANGEROUS_SETTLEMENT = 'Dangerous settlement event',

	ARCHAEOLOGICAL_FIND = 'Archaeological find',
	ASSASSINATION_ATTEMPT = 'Assassination attempt',
	BANDIT_ACTIVITY = 'Bandit activity',
	BOOMTOWN = 'Boomtown',
	BUILDING_DEMAND = 'Building demand',
	CROP_FAILURE = 'Crop failure',
	CULT_ACTIVITY = 'Cult activity',
	DIPLOMATIC_OVERTURE = 'Diplomatic overture',
	DISCOVERY = 'Discovery',
	DRUG_DEN = 'Drug den',
	ECONOMIC_BOOM = 'Economic boom',
	FESTIVE_INVITATION = 'Festive invitation',
	FEUD = 'Feud',
	FOOD_SHORTAGE = 'Food shortage',
	FOOD_SURPLUIS = 'Food surplus',
	GOOD_WEATHER = 'Good weather',
	IMPROVEMENT_DEMAND = 'Improvement demand',
	INQUISITION = 'Inquisition',
	JUSTICE_PREVAILS = 'Justice prevails',
	LAND_RUSH = 'Land rush',
	LARGE_DISASTER = 'Large disaster',
	LOCALIZED_DISASTER = 'Localized disaster',
	MONSTER_ATTACK = 'Monster attack',
	NATURAL_BLESSING = 'Natural blessing',
	NEW_SUBJECTS = 'New subjects',
	NOBLESSE_OBLIGE = 'Noblesse oblige',
	OUTSTANDING_SUCCESS = 'Outstanding success',
	PILGRIMAGE = 'Pilgrimage',
	PLAGUE = 'Plague',
	POLITICAL_CALM = 'Political calm',
	PUBLIC_SCANDAL = 'Public scandal',
	REMARKABLE_TREASURE = 'Remarkable treasure',
	SENSATIONAL_CRIME = 'Sensational crime',
	SLAVERS = 'Slavers',
	SMUGGLERS = 'Smugglers',
	SQUATTERS = 'Squatters',
	UNEXPECTED_FIND = 'Unexpected find',
	VANDALS = 'Vandals',
	VISITING_CELEBRITY = 'Visiting celebrity',
	WEALTHY_IMMIGRANT = 'Wealthy immigrant',
}

export type EventTypeList = Record<EventType, () => ReactElement>;

export const eventTypeList: EventTypeList = {
	'Beneficial kingdom event': {},
	'Dangerous kingdom event': {},
	'Beneficial settlement event': {},
	'Dangerous settlement event': {},

	'Archaeological find': ArchaeologicalFind,
	'Assassination attempt': {
		description:
			'One of your leaders (determined randomly) is the target of an assassination attempt.',
		effect:
			'If the target is a PC, the GM should run the attempt as an encounter, using an assassin of a CR equal to the targeted PC’s level. If the target is an NPC, you must succeed at a Stability check to prevent the assassination. If the assassination occurs, Unrest increases by 1d6 and the kingdom immediately incurs the penalties for not having a leader in that role.',
		type: 'kingdom',
		continuous: false,
	},
	'Bandit activity': {
		description:
			'Bandits are preying upon those who travel through your kingdom.',
		action: 'Stability check',
		success:
			'your kingdom’s defenses stop the bandits before they cause any harm.',
		failure:
			'the bandits reduce your kingdom’s Treasury by 1d6 BP (each time you roll a 6, add the result to the total and roll again).',
		type: 'kingdom',
		continuous: false,
	},
	Boomtown: {
		description:
			'Randomly select one settlement. Commerce booms among that settlement.',
		success:
			'Until the next Event Phase, Economy increases by the number of buildings in the settlement that grant an Economy bonus, and Corruption increases by 1d4 in that settlement.',
		type: 'settlement',
		continuous: false,
	},
	'Building demand': {
		description:
			'The citizens demand a particular building be built (01–75) or demolished (76–100). Select the building type randomly from those available for the settlement.',
		failure:
			'If the demand is not met by the next Event Phase, Unrest increases by 1. Alternatively, you can suppress the citizens’ demands and negate the event by succeeding at a Loyalty check, but this reduces Loyalty by 2 and increases Unrest by 1.',
		type: 'settlement',
		continuous: true,
	},
	'Crop failure': {
		description:
			'Pests, blight, and weather ruin the harvest in the settlement’s hex and all adjacent hexes.',
		action: 'two Stability checks',
		success:
			'the problem is fixed before your kingdom takes any penalties from the event.',
		partial:
			'affected farms reduce Consumption by 1 (instead of the normal reduction) in the next Upkeep Phase.',
		failure:
			'affected farms do not reduce Consumption at all in the next Upkeep Phase.',
		type: 'settlement',
		continuous: false,
	},
	'Cult activity': {
		description:
			'A religious cult of an alignment opposed to the kingdom’s alignment begins kidnapping, converting, or even publicly sacrificing citizens.',
		action: 'a Loyalty check and a Stability check',
		success:
			'the cult is disbanded before your kingdom takes any penalties from the event.',
		partial:
			'Unrest increases by 1 and Productivity, Society, and Stability decrease by 1.',
		failure:
			'Unrest increases by 2 and Productivity, Society, and Stability decrease by 2, and the event continues in the next Event Phase.',
		type: 'settlement',
		continuous: true,
	},
	'Diplomatic overture': {
		description:
			'A nearby kingdom sends an ambassador to you to negotiate an embassy (01–60), treaty (61–90), or alliance (91–100), as if using a diplomatic edict (see Special Edicts). If the GM doesn’t have an appropriate kingdom in mind when this event occurs, determine the kingdom’s alignment randomly; it may be hostile or friendly.',
		success: 'The ambassador bears 1d4 BP worth of gifts for your kingdom.',
		type: 'kingdom',
		continuous: false,
	},
	Discovery: {
		description:
			'Scholars unearth a bit of ancient lore or devise important new research of their own.',
		success: 'Fame increases by 1 and Lore increases by 1d4.',
		type: 'settlement',
		continuous: false,
	},
	'Drug den': {
		description:
			'One of your Houses or Tenements becomes a hive of illicit drug trade.',
		action:
			'a Loyalty check and a Stability check, with a penalty equal to the number of Brothels, Tenements, Waterfronts, and lots with squatters in the settlement',
		success:
			'you eliminate the drug den before your kingdom takes any penalties from the event.',
		partial: 'Crime and Unrest increase by 1.',
		failure:
			'Crime and Unrest increase by 1; Economy, Loyalty, and Stability decrease by 1; and on the next Event Phase, a second drug den event occurs in the same settlement (01–50) or the nearest settlement (51–100).',
		type: 'settlement',
		continuous: true,
	},
	'Economic boom': {
		description: 'Trade is booming in your kingdom!',
		success:
			'Your Treasury increases by 1d6 BP (each time you roll a 6, add the result to the total and roll again).',
		type: 'kingdom',
		continuous: false,
	},
	'Festive invitation': {
		description:
			'Your kingdom’s leaders are invited to a festival in a neighboring kingdom.',
		success:
			'you attend and bring 1d4 BP worth of gifts, for 1 year Society increases by 1, Fame increases by 1 for any check relating to that kingdom, and you gain a +2 bonus on edict checks relating to that kingdom.',
		failure: 'You dont attend',
		type: 'kingdom',
		continuous: false,
	},
	Feud: {
		description: 'Nobles (or other influential rival groups) are bickering.',
		action: 'Loyalty check',
		success: 'you end the event but Unrest increases by 1.',
		failure:
			'Corruption increases by 1, Unrest increases by 1d6, and the event is continuous.',
		type: 'settlement',
		continuous: true,
	},
	'Food shortage': {
		description:
			'Spoilage, treachery, or bad luck has caused a food shortage this turn.',
		action: 'Stability check',
		success: 'Consumption in the next Upkeep Phase increases by 50%.',
		failure: 'Consumption in the next Upkeep Phase increases by 100%.',
		type: 'kingdom',
		continuous: false,
	},
	'Food surplus': {
		description: 'Farmers produce an unexpected windfall!',
		success:
			'In the next Upkeep Phase, the kingdom’s Consumption is halved (but returns to normal on the next turn).',
		type: 'kingdom',
		continuous: false,
	},
	'Good weather': {
		description: 'Good weather raises spirits and productivity.',
		success:
			'Economy, Loyalty, and Productivity increase by 2 until the next Event Phase.',
		type: 'kingdom',
		continuous: false,
	},
	'Improvement demand': {
		description:
			'The citizens demand a particular terrain improvement be built (01–75) or demolished (76–100). Select the terrain improvement type randomly from those available for the hex.',
		failure:
			'If the demand is not met by the next Event Phase, Unrest increases by 1. Alternatively, you can suppress the citizens’ demands and negate the event by succeeding at a Loyalty check, but this reduces Loyalty by 2 and increases Unrest by 1.',
		type: 'hex',
		continuous: true,
	},
	Inquisition: {
		description:
			'Zealots mobilize public opinion against a particular race, religion, kingdom, behavior, or kingdom leader.',
		action: 'Loyalty check',
		success:
			'the zealots are somewhat suppressed; Lore, Loyalty, Productivity, and Stability decrease by 1.',
		failure:
			'the zealots run rampant; Infamy and Law increase by 1 and Lore, Loyalty, Productivity, and Stability decrease by 2',
		effect:
			'Two successful checks in a row end the event (if a check ends the event, no penalties from it occur that turn).',
		type: 'settlement',
		continuous: true,
	},
	'Justice prevails': {
		description:
			'Authorities shut down a major criminal operation or thwart a plot against the settlement.',
		effect:
			'Law and Loyalty increase by 1 and Crime and Unrest decreases by 1.',
		type: 'settlement',
		continuous: false,
	},
	'Land rush': {
		description:
			'Overeager settlers claim an unclaimed hex and construct a Farm, Mine, Quarry, or Sawmill at their own expense, but are fighting over ownership. This hex is not part of your kingdom, so you gain no benefits from it.',
		effect:
			'Productivity, Society, and Stability decrease by 1. Attempt a Loyalty check. If you succeed, Unrest increases by 1. If you fail, Unrest increases by 1d4. If you construct an identical improvement in an adjacent hex during your next Edict Phase, remove this event’s changes to Productivity, Society, and Stability.',
		type: 'kingdom',
		continuous: false,
	},
	'Large disaster': {
		description:
			'A fire, storm, earthquake, flood, massive sabotage, or other disaster strikes!',
		effect:
			'Roll 1d6; on a result of 1–5, the disaster threatens only 1 improved hex. On a result of 6, the disaster is widespread and threatens 1d6 additional improved hexes adjacent to the target hex. Attempt a Stability check for each threatened hex; failure means the disaster destroys one terrain improvement in the hex and Unrest increases by 1. (This Stability check represents your kingdom’s ability to prepare for or react to the disaster as well as the structure’s ability to withstand damage.)',
		type: 'hex',
		continuous: false,
	},
	'Localized disaster': {
		description:
			'A fire, a flood, a storm, an earthquake, massive sabotage, or another disaster strikes the settlement!',
		effect:
			'Roll 1d6 to determine how many lots are threatened by the disaster. On a result of 6, the disaster is widespread and affects 1d6 additional adjacent lots. Attempt a Stability check for each threatened lot; failure means the disaster destroys the building in that lot and Unrest increases by 1. (This Stability check represents your kingdom’s ability to prepare for or react to the disaster as well as the structure’s ability to withstand damage.)',
		type: 'settlement',
		continuous: false,
	},
	'Monster attack': {
		description: 'A monster (or group of monsters) attacks the kingdom.',
		effect:
			'The GM picks a claimed hex in the kingdom in which the monster is active. The CR of the monster encounter is equal to the party’s APL + 1d4 – 1. You can personally deal with the monster (earning XP and treasure normally for your efforts) or succeed at a Stability check to eliminate it (which doesn’t affect you or the kingdom’s statistics). If the monster is not defeated this turn, Unrest increases by 4. If the kingdom’s Unrest is 5 or higher, the monster’s hex becomes unclaimed—this is in addition to losing control of hexes in the Upkeep Phase because of the kingdom’s high Unrest score.',
		type: 'settlement',
		continuous: true,
	},
	'Natural blessing': {
		description:
			'A natural event, such as a bloom of rare and beautiful wildflowers or a good omen in the stars, raises your kingdom’s morale.',
		effect:
			'You gain a +4 bonus on Stability checks until the next Event Phase.',
		type: 'kingdom',
		continuous: false,
	},
	'New subjects': {
		description:
			'A small group of indigenous intelligent creatures joins your kingdom and submits to your rule.',
		effect:
			'Society and Stability increase by 1, Unrest decreases by 1, and your Treasury increases by 1d6 BP (each time you roll a 6, add the result to the total and roll again).',
		type: 'kingdom',
		continuous: false,
	},
	'Noblesse oblige': {
		description:
			'A noble family offers to construct a Monument (01–50) or Park (51–100) in your settlement at the family’s own expense. The nobles pay all costs and Consumption for this purpose.',
		effect: '',
		type: 'settlement',
		continuous: false,
	},
	'Outstanding success': {
		description:
			'One of your kingdom’s citizens creates an artistic masterpiece, constructs a particularly impressive building, or otherwise brings glory to your kingdom.',
		effect:
			'Fame increases by 1, your Treasury increases by 1d6 BP, and Unrest decreases by 2. You gain a +4 bonus on Economy checks until the next Event Phase.',
		type: 'settlement',
		continuous: false,
	},
	Pilgrimage: {
		description:
			'Randomly select one settlement with a Cathedral, Shrine, or Temple. Pious religious folk journey to your settlement, holding a religious festival in that settlement at no BP cost to you.',
		effect: '',
		type: 'kingdom',
		continuous: false,
	},
	Plague: {
		description:
			'A deadly sickness strikes the target hex or settlement. You cannot construct terrain improvements or buildings there while plague persists.',
		effect:
			'Attempt two Stability checks, each with a penalty equal to the number of Brothels, Foreign Quarters, Highways, Inns, Piers, Roads, Stables, Stockyards, Tenements, and Waterfronts in the hex, and a bonus equal to the number of ss, Cathedrals, Herbalists, Hospitals, and Temples in the hex. If you succeed at both checks, the event ends, but Stability decreases by 2 and Treasury by 1d3 BP. If you fail at one check, Stability decreases by 4, Treasury decreases by 1d6 BP, and Unrest increases by 1d3. If you fail at both, Stability decreases by 4, Treasury decreases by 1d6 BP, Unrest increases by 1d6, and in the next Event Phase the plague spreads to an adjacent hex.',
		type: 'hex' | 'settlement',
		continuous: true,
	},
	'Political calm': {
		description:
			'A sudden absence of political machinations coincides with an increase in public approval.',
		effect:
			'Unrest decreases by 1d6. Until the next Event Phase, you gain a +2 bonus on checks to resolve continuous events. If your kingdom has no Unrest and no continuous events, both Loyalty and Stability increase by 1. If you are using Law settlement modifiers for the kingdom (see Expanding Settlement Modifiers), this also increases Law by 1 for the entire kingdom.',
		type: 'kingdom',
		continuous: false,
	},
	'Public scandal': {
		description:
			'One of your leaders is implicated in a crime or an embarrassing situation, such as an affair with another leader’s spouse.',
		effect:
			'Infamy increases by 1. Attempt a Loyalty check. If you fail, Unrest increases by 2 and you take a –4 penalty on all Loyalty checks until the next Event Phase.',
		type: 'kingdom',
		continuous: false,
	},
	'Remarkable treasure': {
		description:
			'The settlement immediately fills one of its open magic item slots (selected randomly) with a better than normal item (medium if a minor slot, major if a medium slot).',
		effect:
			'Treat the settlement’s base value as 50% higher than normal for determining the item’s maximum price. If the settlement doesn’t have any open magic item slots, treat this event as Unexpected Find.',
		type: 'settlement',
		continuous: false,
	},
	'Sensational crime': {
		description:
			'A serial killer, arsonist, or daring bandit plagues your kingdom.',
		effect:
			'Attempt two Stability checks, adding the settlement’s Law and subtracting its Crime. If you succeed at both checks, the criminal is caught before your kingdom takes any penalties from the event. If you fail at one, the criminal escapes, Unrest increases by 1, and the event is continuous. If you fail at both, the criminal makes a fool of the authorities; Law and Loyalty decrease by 1, Treasury decreases by 1d4 BP, Unrest increases by 2, and the event is continuous.',
		type: 'settlement',
		continuous: true,
	},
	Slavers: {
		description:
			'Criminals begin kidnapping citizens and selling them into slavery.',
		effect:
			'Attempt a Loyalty check and a Stability check, each with a penalty equal to the number of Brothels, Tenements, Waterfronts, and lots with squatters in the settlement. If you succeed at both checks, the slavers are caught before your kingdom takes any penalties from the event. If you fail at one of the checks, Loyalty, Stability, and Unrest decrease by 1, but the event is not continuous. If you fail at both checks, Loyalty, Stability, and Unrest decrease by 2, and the event is continuous.',
		type: 'settlement',
		continuous: true,
	},
	Smugglers: {
		description: 'Unscrupulous merchants are subverting legitimate businesses.',
		effect:
			'Attempt a Loyalty check and a Stability check, each with a penalty equal to the number of Piers, Waterfronts, and trade routes in the kingdom. If you succeed at both checks, the smugglers are stopped before your kingdom takes any penalties from the event. If you fail at one of the checks, Corruption increases by 1d2 in each settlement, Crime increases by 1 for the kingdom (Optional Kingdom Rules), Productivity for the kingdom decreases by 1d3, Treasury decreases by 1d3 BP, and the event is not continuous. If you fail at both of the checks, Corruption increases by 1d4, Crime for the kingdom increases by 1, Productivity for the kingdom decreases by 1d6, Treasury decreases by 1d6 BP, and the event is continuous.',
		type: 'kingdom',
		continuous: false,
	},
	Squatters: {
		description:
			'An empty settlement lot is taken over by beggars, troublemakers, and people unable to find adequate work or housing; they camp there with tents, wagons, and shanties.',
		effect:
			'You cannot use the lot for anything until the squatters are dispersed. Fame and Stability decrease by 1, and Unrest increases by 2. You may try to disperse the squatters with a Stability check. Success means the squatters are dispersed and the event is not continuous, but if a House or Tenement is not built in that lot on the next turn, Infamy increases by 1 and Unrest by 2. Failing the Stability check means the event is continuous, and you may not build on that lot until the event is resolved.',
		type: 'settlement',
		continuous: true,
	},
	'Unexpected find': {
		description: 'Local citizens discover a forgotten magical item.',
		effect:
			'The settlement gains one temporary minor (01–70) or medium (71–100) magic item slot that is automatically filled in the next Upkeep Phase. This slot and the item go away if the item is purchased or in the next Event Phase, whichever comes first.',
		type: 'settlement',
		continuous: false,
	},
	Vandals: {
		description: 'Thugs and dissidents riot and destroy property.',
		effect:
			'Attempt a Loyalty check and a Stability check. If you succeed at both, the vandals are stopped before your kingdom takes any penalties. If you fail at one check, Society decreases by 1 and one random building in the settlement is damaged. If you fail at both, one random building is destroyed (Unrest increases by 1 for each lot of the destroyed building), and 1d3 other random buildings are damaged. a damaged building provides no benefits until half its cost is spent repairing it.',
		type: 'settlement',
		continuous: false,
	},
	'Visiting celebrity': {
		description:
			'A celebrity from another kingdom visits one of your settlements, causing a sudden influx of other visitors and spending.',
		effect:
			'Fame increases by 1 and Treasury increases by 1d6 BP (each time you roll a 6, add the result to the total and roll again).',
		type: 'settlement',
		continuous: false,
	},
	'Wealthy immigrant': {
		description:
			'A rich merchant or a noble from another land is impressed with your kingdom and asks to construct a Mansion (01–75) or Noble Villa (76–100) in the settlement at no cost to you. If you allow it, the building provides its normal benefits to your kingdom.',
		effect: '',
		type: 'settlement',
		continuous: false,
	},
};

export function getEventType(roll: number): EventType {
	// todo HANDLE RE-ROLLS
	if (roll < 3) {
		return EventType.NATURAL_BLESSING;
	} else if (roll < 5) {
		return EventType.GOOD_WEATHER;
	} else if (roll < 26) {
		return EventType.BENEFICIAL_KINGDOM;
	} else if (roll < 51) {
		return EventType.DANGEROUS_KINGDOM;
	} else if (roll < 76) {
		return EventType.BENEFICIAL_SETTLEMENT;
	} else if (roll < 97) {
		return EventType.DANGEROUS_SETTLEMENT;
	} else if (roll < 98) {
		return EventType.BANDIT_ACTIVITY;
	} else if (roll < 99) {
		return EventType.SQUATTERS;
	} else if (roll < 100) {
		return EventType.MONSTER_ATTACK;
	} else {
		return EventType.VANDALS;
	}
}

export function getBeneficialKingdomEvent(roll: number): EventType {
	if (roll < 8) {
		return EventType.ARCHAEOLOGICAL_FIND;
	} else if (roll < 13) {
		return EventType.DIPLOMATIC_OVERTURE;
	} else if (roll < 21) {
		return EventType.DISCOVERY;
	} else if (roll < 32) {
		return EventType.ECONOMIC_BOOM;
	} else if (roll < 40) {
		return EventType.FESTIVE_INVITATION;
	} else if (roll < 54) {
		return EventType.FOOD_SURPLUIS;
	} else if (roll < 67) {
		return EventType.GOOD_WEATHER;
	} else if (roll < 76) {
		return EventType.LAND_RUSH;
	} else if (roll < 86) {
		return EventType.NATURAL_BLESSING;
	} else if (roll < 91) {
		return EventType.NEW_SUBJECTS;
	} else {
		return EventType.POLITICAL_CALM;
	}
}

export function getDangerousKingdomEvent(roll: number): EventType {
	if (roll < 6) {
		return EventType.ASSASSINATION_ATTEMPT;
	} else if (roll < 19) {
		return EventType.BANDIT_ACTIVITY;
	} else if (roll < 29) {
		return EventType.FEUD;
	} else if (roll < 42) {
		return EventType.FOOD_SHORTAGE;
	} else if (roll < 52) {
		return EventType.IMPROVEMENT_DEMAND;
	} else if (roll < 60) {
		return EventType.INQUISITION;
	} else if (roll < 65) {
		return EventType.LARGE_DISASTER;
	} else if (roll < 77) {
		return EventType.MONSTER_ATTACK;
	} else if (roll < 85) {
		return EventType.PLAGUE;
	} else if (roll < 93) {
		return EventType.PUBLIC_SCANDAL;
	} else {
		return EventType.SMUGGLERS;
	}
}

export function getBeneficialSettlementEvent(roll: number): EventType {
	if (roll < 15) {
		return EventType.BOOMTOWN;
	} else if (roll < 27) {
		return EventType.DISCOVERY;
	} else if (roll < 41) {
		return EventType.JUSTICE_PREVAILS;
	} else if (roll < 47) {
		return EventType.NOBLESSE_OBLIGE;
	} else if (roll < 59) {
		return EventType.OUTSTANDING_SUCCESS;
	} else if (roll < 67) {
		return EventType.PILGRIMAGE;
	} else if (roll < 73) {
		return EventType.REMARKABLE_TREASURE;
	} else if (roll < 82) {
		return EventType.UNEXPECTED_FIND;
	} else if (roll < 94) {
		return EventType.VISITING_CELEBRITY;
	} else {
		return EventType.WEALTHY_IMMIGRANT;
	}
}

export function getDangerousSettlementEvent(roll: number): EventType {
	if (roll < 11) {
		return EventType.BUILDING_DEMAND;
	} else if (roll < 18) {
		return EventType.CROP_FAILURE;
	} else if (roll < 26) {
		return EventType.CULT_ACTIVITY;
	} else if (roll < 34) {
		return EventType.DRUG_DEN;
	} else if (roll < 42) {
		return EventType.FEUD;
	} else if (roll < 50) {
		return EventType.INQUISITION;
	} else if (roll < 55) {
		return EventType.LOCALIZED_DISASTER;
	} else if (roll < 62) {
		return EventType.MONSTER_ATTACK;
	} else if (roll < 67) {
		return EventType.PLAGUE;
	} else if (roll < 75) {
		return EventType.SENSATIONAL_CRIME;
	} else if (roll < 81) {
		return EventType.SLAVERS;
	} else if (roll < 91) {
		return EventType.SQUATTERS;
	} else {
		return EventType.VANDALS;
	}
}
