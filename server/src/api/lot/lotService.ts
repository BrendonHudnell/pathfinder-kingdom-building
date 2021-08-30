import { getRepository } from 'typeorm';

import { LotEntity } from './lotEntity';

export interface Lot {
	lotType: string;
}

export const lotService = {
	updateLot,
};

async function updateLot(id: number, updates: Partial<Lot>): Promise<boolean> {
	const lotRepository = getRepository(LotEntity);

	const lot = await lotRepository.findOne(id);

	if (!lot) {
		return false;
	}

	lot.lotType = updates.lotType ?? lot.lotType;

	await lotRepository.save(lot);

	return true;
}
