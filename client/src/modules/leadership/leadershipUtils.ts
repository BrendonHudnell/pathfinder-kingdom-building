import { numberReducer } from '../../components/arrayNumberReducer';
import { useAppSelector } from '../../components/store';
import { Role, selectAllRoles } from './leadershipSlice';

export interface RoleConstants {
	name: string;
	attributeOptions: string[];
	penalty: string[];
	penaltyAmount: number;
	unrest: number;
	skillAbility: string;
}

export const roleConstantsList: RoleConstants[] = [
	{
		name: 'Ruler',
		attributeOptions: ['Charisma'],
		penalty: [],
		penaltyAmount: 0,
		unrest: 4,
		skillAbility: 'Knowledge (nobility)',
	},
	{
		name: 'Second Ruler',
		attributeOptions: ['Charisma'],
		penalty: [],
		penaltyAmount: 0,
		unrest: 0,
		skillAbility: 'Knowledge (nobility)',
	},
	{
		name: 'Consort',
		attributeOptions: ['Charisma/2'],
		penalty: [],
		penaltyAmount: 0,
		unrest: 0,
		skillAbility: 'Knowledge (nobility)',
	},
	{
		name: 'Councilor',
		attributeOptions: ['Charisma', 'Wisdom'],
		penalty: ['Loyalty'],
		penaltyAmount: 2,
		unrest: 1,
		skillAbility: 'Knowledge (local)',
	},
	{
		name: 'General',
		attributeOptions: ['Charisma', 'Strength'],
		penalty: ['Loyalty'],
		penaltyAmount: 4,
		unrest: 0,
		skillAbility: 'Profession (soldier)',
	},
	{
		name: 'Grand Diplomat',
		attributeOptions: ['Charisma', 'Intelligence'],
		penalty: ['Stability'],
		penaltyAmount: 2,
		unrest: 0,
		skillAbility: 'Diplomacy',
	},
	{
		name: 'Heir',
		attributeOptions: ['Charisma/2'],
		penalty: [],
		penaltyAmount: 0,
		unrest: 0,
		skillAbility: 'Knowledge (nobility)',
	},
	{
		name: 'High Priest',
		attributeOptions: ['Charisma', 'Wisdom'],
		penalty: ['Stability', 'Loyalty'],
		penaltyAmount: 2,
		unrest: 1,
		skillAbility: 'Knowledge (religion)',
	},
	{
		name: 'Magister',
		attributeOptions: ['Charisma', 'Intelligence'],
		penalty: ['Economy'],
		penaltyAmount: 4,
		unrest: 0,
		skillAbility: 'Knowledge (arcana)',
	},
	{
		name: 'Marshal',
		attributeOptions: ['Dexterity', 'Wisdom'],
		penalty: ['Economy'],
		penaltyAmount: 4,
		unrest: 0,
		skillAbility: 'Survival',
	},
	{
		name: 'Royal Enforcer',
		attributeOptions: ['Dexterity', 'Strength'],
		penalty: [],
		penaltyAmount: 0,
		unrest: 0,
		skillAbility: 'Intimidate',
	},
	{
		name: 'Spymaster',
		attributeOptions: ['Dexterity', 'Intelligence'],
		penalty: ['Economy'],
		penaltyAmount: 4,
		unrest: 1,
		skillAbility: 'Sense Motive',
	},
	{
		name: 'Treasurer',
		attributeOptions: ['Intelligence', 'Wisdom'],
		penalty: ['Economy'],
		penaltyAmount: 4,
		unrest: 0,
		skillAbility: 'Profession (merchant)',
	},
	{
		name: 'Warden',
		attributeOptions: ['Constitution', 'Strength'],
		penalty: ['Loyalty', 'Stability'],
		penaltyAmount: 2,
		unrest: 0,
		skillAbility: 'Knowledge (engineering)',
	},
	{
		name: 'Viceroy',
		attributeOptions: ['Intelligence/2', 'Wisdom/2'],
		penalty: [],
		penaltyAmount: 0,
		unrest: 4,
		skillAbility: 'Knowledge (geography)',
	},
];

export const roleBenefitList = [
	'Economy',
	'Stability',
	'Loyalty',
	'Economy and Stability',
	'Economy and Loyalty',
	'Stability and Loyalty',
	'Economy and Stability and Loyalty',
];

export type KingdomStat = 'Economy' | 'Stability' | 'Loyalty';

export function useLeadershipBonusByType(type: KingdomStat): number {
	const roles = useAppSelector((state) => selectAllRoles(state));
	const skillsEnabled = useAppSelector(
		(state) => state.kingdom.options.leadershipSkills
	);

	return (
		getLeadershipPositivesByType(roles, type, skillsEnabled) -
		getLeadershipNegativesByType(roles, type)
	);
}

export function useLeadershipUnrest(): number {
	const roles = useAppSelector((state) => selectAllRoles(state));

	const vacantRoleNames = roles
		.filter((role) => role.vacant)
		.map((role) => role.name);

	return roleConstantsList
		.filter((role) => vacantRoleNames.indexOf(role.name) >= 0)
		.map((role) => role.unrest)
		.reduce(numberReducer, 0);
}

export function getLeadershipPositivesByType(
	roles: Role[],
	bonusType: KingdomStat,
	skillsEnabled: boolean
): number {
	return roles
		.filter((role) => !role.vacant && role.benefit.includes(bonusType))
		.map((role) =>
			role.name === 'Consort' || role.name === 'Heir'
				? Math.floor(role.abilityBonus / 2) +
				  (role.leadership ? 1 : 0) +
				  (skillsEnabled ? Math.floor(role.skillBonus / 5) : 0)
				: role.abilityBonus +
				  (role.leadership ? 1 : 0) +
				  (skillsEnabled ? Math.floor(role.skillBonus / 5) : 0)
		)
		.reduce(numberReducer, 0);
}

export function getLeadershipNegativesByType(
	roles: Role[],
	penaltyType: KingdomStat
): number {
	const vacantRoleNames = roles
		.filter((role) => role.vacant)
		.map((role) => role.name);

	return roleConstantsList
		.filter(
			(role) =>
				vacantRoleNames.indexOf(role.name) >= 0 &&
				role.penalty.includes(penaltyType)
		)
		.map((role) => role.penaltyAmount)
		.reduce(numberReducer, 0);
}
