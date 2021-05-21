import {
	BuildingDisplayType,
	BuildingListType,
	LotType,
} from './buildingTypes';

export function getBuildingDisplayTypeByLotType(
	lotType: LotType
): BuildingDisplayType {
	return lotType.split(' ')[0].replace('_', ' ') as BuildingDisplayType;
}

export function getBuildingDisplayTypeByListType(
	lotType: BuildingListType
): BuildingDisplayType {
	return (lotType.substr(-1) === 'H' || lotType.substr(-1) === 'V'
		? lotType.slice(0, -2)
		: lotType) as BuildingDisplayType;
}

export function getBuildingListTypeByLotType(
	lotType: LotType
): BuildingListType {
	const [base, ext] = lotType.split(' ');

	if (ext === 'L' || ext === 'R') {
		return (base + ' H') as BuildingListType;
	}
	if (ext === 'T' || ext === 'B') {
		return (base + ' V') as BuildingListType;
	}

	return base as BuildingListType;
}

export function getSizeByLotType(lotType: LotType): number {
	const lastTwo = lotType.slice(-2);
	switch (lastTwo) {
		case ' L':
		case ' R':
		case ' T':
		case ' B':
			return 2;
		case 'TL':
		case 'TR':
		case 'BL':
		case 'BR':
			return 4;
		default:
			return 1;
	}
}

export function getLotOffsetByLotType(lotType: LotType): number[] {
	const ext = lotType.slice(-2);

	let offset: number[];

	if (ext === ' L') {
		offset = [0, 1];
	} else if (ext === ' R') {
		offset = [-1, 0];
	} else if (ext === ' T') {
		offset = [0, 6];
	} else if (ext === ' B') {
		offset = [-6, 0];
	} else if (ext === 'TL') {
		offset = [0, 1, 6, 7];
	} else if (ext === 'TR') {
		offset = [-1, 0, 5, 6];
	} else if (ext === 'BL') {
		offset = [-6, -5, 0, 1];
	} else {
		offset = [-7, -6, -1, 0];
	}

	return offset;
}

export function getNewLotTypesByLotType(lotType: LotType): LotType[] {
	const [base, ext] = lotType.split(' ');

	let newLotType: LotType[];

	if (ext === 'L') {
		newLotType = [(base + ' L') as LotType, (base + ' R') as LotType];
	} else if (ext === 'R') {
		newLotType = [(base + ' L') as LotType, (base + ' R') as LotType];
	} else if (ext === 'T') {
		newLotType = [(base + ' T') as LotType, (base + ' B') as LotType];
	} else if (ext === 'B') {
		newLotType = [(base + ' T') as LotType, (base + ' B') as LotType];
	} else if (ext === 'TL') {
		newLotType = [
			(base + ' TL') as LotType,
			(base + ' TR') as LotType,
			(base + ' BL') as LotType,
			(base + ' BR') as LotType,
		];
	} else if (ext === 'TR') {
		newLotType = [
			(base + ' TL') as LotType,
			(base + ' TR') as LotType,
			(base + ' BL') as LotType,
			(base + ' BR') as LotType,
		];
	} else if (ext === 'BL') {
		newLotType = [
			(base + ' TL') as LotType,
			(base + ' TR') as LotType,
			(base + ' BL') as LotType,
			(base + ' BR') as LotType,
		];
	} else {
		newLotType = [
			(base + ' TL') as LotType,
			(base + ' TR') as LotType,
			(base + ' BL') as LotType,
			(base + ' BR') as LotType,
		];
	}

	return newLotType;
}
