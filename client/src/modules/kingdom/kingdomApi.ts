import ky from 'ky';

import { KingdomState } from './kingdomSlice';

export const kingdomApi = {
	getKingdom,
};

async function getKingdom(id: number): Promise<KingdomState> {
	const response = await ky
		.get('/api/kingdom', { searchParams: { id } })
		.json();

	return response as KingdomState;
}
