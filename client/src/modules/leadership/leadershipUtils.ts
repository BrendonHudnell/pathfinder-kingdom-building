import { numberReducer } from '../../components/arrayNumberReducer';
import { useAppSelector } from '../../components/store';
import { Role, selectAllRoles } from './leadershipSlice';

export interface RoleConstants {
	name: string;
	attributeOptions: string[];
	penalty: string[];
	penaltyAmount: number;
	unrest: number;
}

export const staticRoleThings: RoleConstants[] = [
	{
		name: 'Ruler',
		attributeOptions: ['Charisma'],
		penalty: [],
		penaltyAmount: 0,
		unrest: 4,
	},
	{
		name: 'Consort',
		attributeOptions: ['Charisma/2'],
		penalty: [],
		penaltyAmount: 0,
		unrest: 0,
	},
	{
		name: 'Councilor',
		attributeOptions: ['Charisma', 'Wisdom'],
		penalty: ['Loyalty'],
		penaltyAmount: 2,
		unrest: 1,
	},
	{
		name: 'General',
		attributeOptions: ['Charisma', 'Strength'],
		penalty: ['Loyalty'],
		penaltyAmount: 4,
		unrest: 0,
	},
	{
		name: 'Grand Diplomat',
		attributeOptions: ['Charisma', 'Intelligence'],
		penalty: ['Stability'],
		penaltyAmount: 2,
		unrest: 0,
	},
	{
		name: 'Heir',
		attributeOptions: ['Charisma/2'],
		penalty: [],
		penaltyAmount: 0,
		unrest: 0,
	},
	{
		name: 'High Priest',
		attributeOptions: ['Charisma', 'Wisdom'],
		penalty: ['Stability', 'Loyalty'],
		penaltyAmount: 2,
		unrest: 1,
	},
	{
		name: 'Magister',
		attributeOptions: ['Charisma', 'Intelligence'],
		penalty: ['Economy'],
		penaltyAmount: 4,
		unrest: 0,
	},
	{
		name: 'Marshal',
		attributeOptions: ['Dexterity', 'Wisdom'],
		penalty: ['Economy'],
		penaltyAmount: 4,
		unrest: 0,
	},
	{
		name: 'Royal Enforcer',
		attributeOptions: ['Dexterity', 'Strength'],
		penalty: [],
		penaltyAmount: 0,
		unrest: 0,
	},
	{
		name: 'Spymaster',
		attributeOptions: ['Dexterity', 'Intelligence'],
		penalty: ['Economy'],
		penaltyAmount: 4,
		unrest: 1,
	},
	{
		name: 'Treasurer',
		attributeOptions: ['Intelligence', 'Wisdom'],
		penalty: ['Economy'],
		penaltyAmount: 4,
		unrest: 0,
	},
	{
		name: 'Warden',
		attributeOptions: ['Constitution', 'Strength'],
		penalty: ['Loyalty', 'Stability'],
		penaltyAmount: 2,
		unrest: 0,
	},
	{
		name: 'Viceroy',
		attributeOptions: ['Intelligence/2', 'Wisdom/2'],
		penalty: [],
		penaltyAmount: 0,
		unrest: 4,
	},
];

export type KingdomStat = 'Economy' | 'Stability' | 'Loyalty';

export function useLeadershipBonusByType(type: KingdomStat): number {
	const roles = useAppSelector((state) => selectAllRoles(state));

	return (
		getLeadershipPositivesByType(roles, type) -
		getLeadershipNegativesByType(roles, type)
	);
}

export function useLeadershipUnrest(): number {
	const roles = useAppSelector((state) => selectAllRoles(state));

	const vacantRoleNames = roles
		.filter((role) => role.vacant)
		.map((role) => role.name);

	return staticRoleThings
		.filter((role) => vacantRoleNames.indexOf(role.name) >= 0)
		.map((role) => role.unrest)
		.reduce(numberReducer, 0);
}

export function getLeadershipPositivesByType(
	roles: Role[],
	bonusType: KingdomStat
): number {
	return roles
		.filter((role) => !role.vacant && role.benefit.includes(bonusType))
		.map((role) => role.abilityBonus + (role.leadership ? 1 : 0))
		.reduce(numberReducer, 0);
}

export function getLeadershipNegativesByType(
	roles: Role[],
	penaltyType: KingdomStat
): number {
	const vacantRoleNames = roles
		.filter((role) => role.vacant)
		.map((role) => role.name);

	return staticRoleThings
		.filter(
			(role) =>
				vacantRoleNames.indexOf(role.name) >= 0 &&
				role.penalty.includes(penaltyType)
		)
		.map((role) => role.penaltyAmount)
		.reduce(numberReducer, 0);
}

// TODO remove once hooked up to server to fetch initial state
export const initialRoles: Role[] = [
	{
		id: 1,
		name: 'Ruler',
		heldBy: '',
		attribute: 'Charisma',
		abilityBonus: 0,
		leadership: false,
		benefit: 'Economy',
		vacant: true,
	},
	{
		id: 2,
		name: 'Consort',
		heldBy: '',
		attribute: 'Charisma/2',
		abilityBonus: 0,
		leadership: false,
		benefit: 'Loyalty',
		vacant: true,
	},
	{
		id: 3,
		name: 'Councilor',
		heldBy: '',
		attribute: 'Charisma',
		abilityBonus: 0,
		leadership: false,
		benefit: 'Loyalty',
		vacant: true,
	},
	{
		id: 4,
		name: 'General',
		heldBy: '',
		attribute: 'Charisma',
		abilityBonus: 0,
		leadership: false,
		benefit: 'Stability',
		vacant: true,
	},
	{
		id: 5,
		name: 'Grand Diplomat',
		heldBy: '',
		attribute: 'Charisma',
		abilityBonus: 0,
		leadership: false,
		benefit: 'Stability',
		vacant: true,
	},
	{
		id: 6,
		name: 'Heir',
		heldBy: '',
		attribute: 'Charisma/2',
		abilityBonus: 0,
		leadership: false,
		benefit: 'Loyalty',
		vacant: true,
	},
	{
		id: 7,
		name: 'High Priest',
		heldBy: '',
		attribute: 'Charisma',
		abilityBonus: 0,
		leadership: false,
		benefit: 'Stability',
		vacant: true,
	},
	{
		id: 8,
		name: 'Magister',
		heldBy: '',
		attribute: 'Charisma',
		abilityBonus: 0,
		leadership: false,
		benefit: 'Economy',
		vacant: true,
	},
	{
		id: 9,
		name: 'Marshal',
		heldBy: '',
		attribute: 'Dexterity',
		abilityBonus: 0,
		leadership: false,
		benefit: 'Economy',
		vacant: true,
	},
	{
		id: 10,
		name: 'Royal Enforcer',
		heldBy: '',
		attribute: 'Dexterity',
		abilityBonus: 0,
		leadership: false,
		benefit: 'Loyalty',
		vacant: true,
	},
	{
		id: 11,
		name: 'Spymaster',
		heldBy: '',
		attribute: 'Dexterity',
		abilityBonus: 0,
		leadership: false,
		benefit: 'Economy',
		vacant: true,
	},
	{
		id: 12,
		name: 'Treasurer',
		heldBy: '',
		attribute: 'Intelligence',
		abilityBonus: 0,
		leadership: false,
		benefit: 'Economy',
		vacant: true,
	},
	{
		id: 13,
		name: 'Warden',
		heldBy: '',
		attribute: 'Constitution',
		abilityBonus: 0,
		leadership: false,
		benefit: 'Loyalty',
		vacant: true,
	},
];
