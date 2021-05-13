import { useAppSelector } from '../../components/store';
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

export interface AlignmentBonusObject {
	economy: number;
	stability: number;
	loyalty: number;
}

export interface EdictBonusObject {
	economy: number;
	stability: number;
	loyalty: number;
	consumption: number;
}

export function useAlignmentBonuses(): AlignmentBonusObject {
	const alignment = useAppSelector((state) => state.kingdom.alignment);

	switch (alignment) {
		case Alignment.LG:
			return { economy: 2, stability: 0, loyalty: 2 };
		case Alignment.NG:
			return { economy: 0, stability: 2, loyalty: 2 };
		case Alignment.CG:
			return { economy: 0, stability: 0, loyalty: 4 };
		case Alignment.LN:
			return { economy: 2, stability: 2, loyalty: 0 };
		case Alignment.N:
			return { economy: 0, stability: 4, loyalty: 0 };
		case Alignment.CN:
			return { economy: 0, stability: 2, loyalty: 2 };
		case Alignment.LE:
			return { economy: 4, stability: 0, loyalty: 0 };
		case Alignment.NE:
			return { economy: 2, stability: 2, loyalty: 0 };
		case Alignment.CE:
			return { economy: 2, stability: 0, loyalty: 2 };
	}
}

export function useEdictsBonuses(): EdictBonusObject {
	let economy = 0;
	let stability = 0;
	let loyalty = 0;
	let consumption = 0;

	const holidayEdict = useAppSelector((state) => state.kingdom.holidayEdict);
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

	const promotionEdict = useAppSelector(
		(state) => state.kingdom.promotionEdict
	);
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

	const taxationEdict = useAppSelector((state) => state.kingdom.taxationEdict);
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
};
