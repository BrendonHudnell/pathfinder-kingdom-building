import { getRepository } from 'typeorm';
import { KingdomEntity } from './kingdomEntity';

export const kingdomService = {
	getKingdom,
};

async function getKingdom(
	kingdomId: number
): Promise<KingdomEntity | undefined> {
	const kingdomRepository = getRepository(KingdomEntity);

	return kingdomRepository.findOne(kingdomId);
}
