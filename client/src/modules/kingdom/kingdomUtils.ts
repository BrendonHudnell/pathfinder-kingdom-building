import { numberReducer } from '../../components/arrayNumberReducer';
import { GovernmentBonusObject } from '../settlement';
import { KingdomState } from './kingdomSlice';

export enum Alignment {
	LG = 'Lawful Good',
	NG = 'Neutral Good',
	CG = 'Chaotic Good',
	LN = 'Lawful Neutral',
	N = 'Neutral',
	CN = 'Chaotic Neutral',
	LE = 'Lawful Evil',
	NE = 'Neutral Evil',
	CE = 'Chaotic Evil',
}

export enum HolidayEdict {
	NONE = 'None',
	ONE = '1/year',
	SIX = '6/year',
	TWELVE = '12/year',
	TWENTYFOUR = '24/year',
}

export enum PromotionEdict {
	NONE = 'None',
	TOKEN = 'Token',
	STANDARD = 'Standard',
	AGGRESSIVE = 'Aggressive',
	EXPANSIONIST = 'Expansionist',
}

export enum TaxationEdict {
	NONE = 'None',
	LIGHT = 'Light',
	NORMAL = 'Normal',
	HEAVY = 'Heavy',
	OVERWHELMING = 'Overwhelming',
}

export enum KingdomGovernment {
	FEUDAL_MONARCHY = 'Feudal Monarchy',
	AUTOCRACY = 'Autocracy',
	MAGOCRACY = 'Magocracy',
	OLIGARCHY = 'Oligarchy',
	OVERLORD = 'Overlord',
	REPUBLIC = 'Republic',
	SECRET_SYNDICATE = 'Secret Syndicate',
	THEOCRACY = 'Theocracy',
}

export type FameKingdomLevel = 1 | 11 | 26 | 51 | 101 | 201;

export enum FameValue {
	NONE = 'none',
	FAME = 'fame',
	INFAMY = 'infamy',
}

export interface AlignmentMenuItem {
	title: string;
	value: Alignment;
}

export interface HolidayEdictMenuItem {
	title: string;
	value: HolidayEdict;
}

export interface PromotionEdictMenuItem {
	title: string;
	value: PromotionEdict;
}

export interface TaxationEdictMenuItem {
	title: string;
	value: TaxationEdict;
}

export interface KingdomGovernmentMenuItem {
	title: string;
	value: KingdomGovernment;
}

export interface FameInfo {
	set: boolean;
	value: FameValue;
}

export type KingdomFame = Record<FameKingdomLevel, FameInfo>;

export const alignmentMenuItems: AlignmentMenuItem[] = [
	{
		title: '+2 Economy, +2 Loyalty',
		value: Alignment.LG,
	},
	{
		title: '+2 Stability, +2 Loyalty',
		value: Alignment.NG,
	},
	{
		title: '+4 Loyalty',
		value: Alignment.CG,
	},
	{
		title: '+2 Economy, +2 Stability',
		value: Alignment.LN,
	},
	{
		title: '+4 Stability',
		value: Alignment.N,
	},
	{
		title: '+2 Stability, +2 Loyalty',
		value: Alignment.CN,
	},
	{
		title: '+4 Economy',
		value: Alignment.LE,
	},
	{
		title: '+2 Economy, +2 Stability',
		value: Alignment.NE,
	},
	{
		title: '+2 Economy, +2 Loyalty',
		value: Alignment.CE,
	},
];

export const holidayEdictMenuItems: HolidayEdictMenuItem[] = [
	{
		title: '-1 Loyalty, +0 Consumption',
		value: HolidayEdict.NONE,
	},
	{
		title: '+1 Loyalty, +1 Consumption',
		value: HolidayEdict.ONE,
	},
	{
		title: '+2 Loyalty, +2 Consumption',
		value: HolidayEdict.SIX,
	},
	{
		title: '+3 Loyalty, +4 Consumption',
		value: HolidayEdict.TWELVE,
	},
	{
		title: '+4 Loyalty, +8 Consumption',
		value: HolidayEdict.TWENTYFOUR,
	},
];

export const promotionEdictMenuItems: PromotionEdictMenuItem[] = [
	{
		title: '-1 Stability, +0 Consumption',
		value: PromotionEdict.NONE,
	},
	{
		title: '+1 Stability, +1 Consumption',
		value: PromotionEdict.TOKEN,
	},
	{
		title: '+2 Stability, +2 Consumption',
		value: PromotionEdict.STANDARD,
	},
	{
		title: '+3 Stability, +4 Consumption',
		value: PromotionEdict.AGGRESSIVE,
	},
	{
		title: '+4 Stability, +8 Consumption',
		value: PromotionEdict.EXPANSIONIST,
	},
];

export const taxationEdictMenuItems: TaxationEdictMenuItem[] = [
	{
		title: '+0 Economy, +1 Loyalty',
		value: TaxationEdict.NONE,
	},
	{
		title: '+1 Economy, -1 Loyalty',
		value: TaxationEdict.LIGHT,
	},
	{
		title: '+2 Economy, -2 Loyalty',
		value: TaxationEdict.NORMAL,
	},
	{
		title: '+3 Economy, -4 Loyalty',
		value: TaxationEdict.HEAVY,
	},
	{
		title: '+4 Economy, -8 Loyalty',
		value: TaxationEdict.OVERWHELMING,
	},
];

export const kingdomGovernmentMenuItems: KingdomGovernmentMenuItem[] = [
	{
		title: 'No bonuses',
		value: KingdomGovernment.FEUDAL_MONARCHY,
	},
	{
		title: 'No bonuses',
		value: KingdomGovernment.AUTOCRACY,
	},
	{
		title: '+2 Lore, -1 Productivity, -1 Society',
		value: KingdomGovernment.MAGOCRACY,
	},
	{
		title: '+1 Corruption, +1 Society, -1 Law, -1 Lore',
		value: KingdomGovernment.OLIGARCHY,
	},
	{
		title: '+1 Corruption, +1 Law, -1 Crime, -1 Society',
		value: KingdomGovernment.OVERLORD,
	},
	{
		title: '+1 Productivity, +1 Society, -1 Crime, -1 Law',
		value: KingdomGovernment.REPUBLIC,
	},
	{
		title: '+1 Corruption, +1 Crime, +1 Productivity, -3 Law',
		value: KingdomGovernment.SECRET_SYNDICATE,
	},
	{
		title: '+1 Law, +1 Lore, -1 Corruption, -1 Society',
		value: KingdomGovernment.THEOCRACY,
	},
];

export interface AlignmentBonusObject {
	economy: number;
	stability: number;
	loyalty: number;
	corruption: number;
	crime: number;
	law: number;
	lore: number;
	society: number;
}

export interface EdictBonusObject {
	economy: number;
	stability: number;
	loyalty: number;
	consumption: number;
}

export function getAlignmentBonuses(
	alignment: Alignment
): AlignmentBonusObject {
	switch (alignment) {
		case Alignment.LG:
			return {
				economy: 2,
				stability: 0,
				loyalty: 2,
				corruption: 0,
				crime: 0,
				law: 1,
				lore: 0,
				society: 1,
			};
		case Alignment.NG:
			return {
				economy: 0,
				stability: 2,
				loyalty: 2,
				corruption: 0,
				crime: 0,
				law: 0,
				lore: 1,
				society: 1,
			};
		case Alignment.CG:
			return {
				economy: 0,
				stability: 0,
				loyalty: 4,
				corruption: 0,
				crime: 1,
				law: 0,
				lore: 0,
				society: 1,
			};
		case Alignment.LN:
			return {
				economy: 2,
				stability: 2,
				loyalty: 0,
				corruption: 0,
				crime: 0,
				law: 1,
				lore: 1,
				society: 0,
			};
		case Alignment.N:
			return {
				economy: 0,
				stability: 4,
				loyalty: 0,
				corruption: 0,
				crime: 0,
				law: 0,
				lore: 2,
				society: 0,
			};
		case Alignment.CN:
			return {
				economy: 0,
				stability: 2,
				loyalty: 2,
				corruption: 0,
				crime: 1,
				law: 0,
				lore: 1,
				society: 0,
			};
		case Alignment.LE:
			return {
				economy: 4,
				stability: 0,
				loyalty: 0,
				corruption: 1,
				crime: 0,
				law: 1,
				lore: 0,
				society: 0,
			};
		case Alignment.NE:
			return {
				economy: 2,
				stability: 2,
				loyalty: 0,
				corruption: 1,
				crime: 0,
				law: 0,
				lore: 1,
				society: 0,
			};
		case Alignment.CE:
			return {
				economy: 2,
				stability: 0,
				loyalty: 2,
				corruption: 1,
				crime: 1,
				law: 0,
				lore: 0,
				society: 0,
			};
	}
}

export function getEdictsBonuses(
	holidayEdict: HolidayEdict,
	promotionEdict: PromotionEdict,
	taxationEdict: TaxationEdict
): EdictBonusObject {
	let economy = 0;
	let stability = 0;
	let loyalty = 0;
	let consumption = 0;

	if (holidayEdict === HolidayEdict.NONE) {
		loyalty -= 1;
	} else if (holidayEdict === HolidayEdict.ONE) {
		loyalty += 1;
		consumption += 1;
	} else if (holidayEdict === HolidayEdict.SIX) {
		loyalty += 2;
		consumption += 2;
	} else if (holidayEdict === HolidayEdict.TWELVE) {
		loyalty += 3;
		consumption += 4;
	} else if (holidayEdict === HolidayEdict.TWENTYFOUR) {
		loyalty += 4;
		consumption += 8;
	}

	if (promotionEdict === PromotionEdict.NONE) {
		stability -= 1;
	} else if (promotionEdict === PromotionEdict.TOKEN) {
		stability += 1;
		consumption += 1;
	} else if (promotionEdict === PromotionEdict.STANDARD) {
		stability += 2;
		consumption += 2;
	} else if (promotionEdict === PromotionEdict.AGGRESSIVE) {
		stability += 3;
		consumption += 4;
	} else if (promotionEdict === PromotionEdict.EXPANSIONIST) {
		stability += 4;
		consumption += 8;
	}

	if (taxationEdict === TaxationEdict.NONE) {
		loyalty += 1;
	} else if (taxationEdict === TaxationEdict.LIGHT) {
		economy += 1;
		loyalty -= 1;
	} else if (taxationEdict === TaxationEdict.NORMAL) {
		economy += 2;
		loyalty -= 2;
	} else if (taxationEdict === TaxationEdict.HEAVY) {
		economy += 3;
		loyalty -= 4;
	} else if (taxationEdict === TaxationEdict.OVERWHELMING) {
		economy += 4;
		loyalty -= 8;
	}

	return { economy, stability, loyalty, consumption };
}

export function getKingdomFame(fame: KingdomFame): number {
	return Object.values(fame)
		.map((level) => (level.value === FameValue.FAME ? 1 : 0))
		.reduce(numberReducer, 0);
}

export function getKingdomInfamy(fame: KingdomFame): number {
	return Object.values(fame)
		.map((level) => (level.value === FameValue.INFAMY ? 1 : 0))
		.reduce(numberReducer, 0);
}

export function getUnsetKingdomFame(
	fame: KingdomFame,
	kingdomSize: number
): number {
	return Object.entries(fame)
		.map(([level, info]) => (kingdomSize >= Number(level) && !info.set ? 1 : 0))
		.reduce(numberReducer, 0);
}

export function getKingdomGovernmentBonuses(
	government: KingdomGovernment
): GovernmentBonusObject {
	switch (government) {
		case KingdomGovernment.FEUDAL_MONARCHY:
		case KingdomGovernment.AUTOCRACY:
			return {
				corruption: 0,
				crime: 0,
				law: 0,
				lore: 0,
				productivity: 0,
				society: 0,
			};
		case KingdomGovernment.MAGOCRACY:
			return {
				corruption: 0,
				crime: 0,
				law: 0,
				lore: 2,
				productivity: -1,
				society: -1,
			};
		case KingdomGovernment.OLIGARCHY:
			return {
				corruption: 1,
				crime: 0,
				law: -1,
				lore: -1,
				productivity: 0,
				society: 1,
			};
		case KingdomGovernment.OVERLORD:
			return {
				corruption: 1,
				crime: -1,
				law: 1,
				lore: 0,
				productivity: 0,
				society: -1,
			};
		case KingdomGovernment.REPUBLIC:
			return {
				corruption: 0,
				crime: -1,
				law: -1,
				lore: 0,
				productivity: 1,
				society: 1,
			};
		case KingdomGovernment.SECRET_SYNDICATE:
			return {
				corruption: 1,
				crime: 1,
				law: -3,
				lore: 0,
				productivity: 1,
				society: 0,
			};
		case KingdomGovernment.THEOCRACY:
			return {
				corruption: -1,
				crime: 0,
				law: 1,
				lore: 1,
				productivity: 0,
				society: -1,
			};
	}
}

// TODO remove once hooked up to server to fetch initial state
export const initialKingdomState: KingdomState = {
	name: 'Untitled',
	alignment: Alignment.N,
	month: 1,
	treasury: 0,
	unrest: 0,
	holidayEdict: HolidayEdict.NONE,
	promotionEdict: PromotionEdict.NONE,
	taxationEdict: TaxationEdict.NONE,
	fame: {
		1: {
			set: false,
			value: FameValue.NONE,
		},
		11: {
			set: false,
			value: FameValue.NONE,
		},
		26: {
			set: false,
			value: FameValue.NONE,
		},
		51: {
			set: false,
			value: FameValue.NONE,
		},
		101: {
			set: false,
			value: FameValue.NONE,
		},
		201: {
			set: false,
			value: FameValue.NONE,
		},
	},
	government: KingdomGovernment.FEUDAL_MONARCHY,
};
