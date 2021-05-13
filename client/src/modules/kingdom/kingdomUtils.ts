import { useAppSelector } from '../../components/store';
import { KingdomState } from './kingdomSlice';

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
	let economy = 0;
	let stability = 0;
	let loyalty = 0;

	const alignment = useAppSelector((state) => state.kingdom.alignment);
	if (alignment[0] === 'L') {
		economy += 2;
	} else if (alignment[0] === 'N') {
		stability += 2;
	} else if (alignment[0] === 'C') {
		loyalty += 2;
	}
	if (alignment[1] === undefined || alignment[1] === 'N') {
		stability += 2;
	} else if (alignment[1] === 'G') {
		loyalty += 2;
	} else if (alignment[1] === 'E') {
		economy += 2;
	}

	return { economy, stability, loyalty };
}

export function useEdictsBonuses(): EdictBonusObject {
	let economy = 0;
	let stability = 0;
	let loyalty = 0;
	let consumption = 0;

	const holidayEdictLevel = useAppSelector(
		(state) => state.kingdom.holidayEdictLevel
	);
	if (holidayEdictLevel === 0) {
		loyalty -= 1;
	} else if (holidayEdictLevel === 1) {
		loyalty += 1;
		consumption += 1;
	} else if (holidayEdictLevel === 2) {
		loyalty += 2;
		consumption += 2;
	} else if (holidayEdictLevel === 3) {
		loyalty += 3;
		consumption += 4;
	} else if (holidayEdictLevel === 4) {
		loyalty += 4;
		consumption += 8;
	}

	const promotionEdictLevel = useAppSelector(
		(state) => state.kingdom.promotionEdictLevel
	);
	if (promotionEdictLevel === 0) {
		stability -= 1;
	} else if (promotionEdictLevel === 1) {
		stability += 1;
		consumption += 1;
	} else if (promotionEdictLevel === 2) {
		stability += 2;
		consumption += 2;
	} else if (promotionEdictLevel === 3) {
		stability += 3;
		consumption += 4;
	} else if (promotionEdictLevel === 4) {
		stability += 4;
		consumption += 8;
	}

	const taxationEdictLevel = useAppSelector(
		(state) => state.kingdom.taxationEdictLevel
	);
	if (taxationEdictLevel === 0) {
		loyalty += 1;
	} else if (taxationEdictLevel === 1) {
		economy += 1;
		loyalty -= 1;
	} else if (taxationEdictLevel === 2) {
		economy += 2;
		loyalty -= 2;
	} else if (taxationEdictLevel === 3) {
		economy += 3;
		loyalty -= 4;
	} else if (taxationEdictLevel === 4) {
		economy += 4;
		loyalty -= 8;
	}

	return { economy, stability, loyalty, consumption };
}

// TODO remove once hooked up to server to fetch initial state
export const initialKingdomState: KingdomState = {
	name: 'Untitled',
	alignment: 'N',
	month: 1,
	treasury: 0,
	unrest: 0,
	holidayEdictLevel: 0,
	promotionEdictLevel: 0,
	taxationEdictLevel: 0,
};
