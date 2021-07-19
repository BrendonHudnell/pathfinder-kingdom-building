import ky from 'ky';

import { KingdomState } from './kingdomSlice';
import { defaultKingdomState } from './kingdomUtils';

export interface KingdomResponse {
	status: number;
	data?: KingdomState;
}

export const kingdomApi = {
	getKingdom,
};

async function getKingdom(id: number): Promise<KingdomState> {
	const response: KingdomResponse = await ky
		.get('/api/kingdom', { searchParams: { id } })
		.json();

	if (response.status !== 200) {
		return defaultKingdomState;
	}

	return response.data ?? defaultKingdomState;
}
