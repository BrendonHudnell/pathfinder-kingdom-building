import ky from 'ky';

import { KingdomState } from './kingdomSlice';
import { defaultKingdomState } from './kingdomUtils';

export interface GetKingdomResponse {
	status: number;
	data?: KingdomState;
}

export interface UpdateKingdomResponse {
	status: number;
}

export const kingdomApi = {
	getKingdom,
	updateKingdom,
};

async function getKingdom(id: number): Promise<KingdomState> {
	const response: GetKingdomResponse = await ky
		.get('/api/kingdom', { searchParams: { id } })
		.json();

	if (response.status !== 200) {
		return defaultKingdomState;
	}

	return response.data ?? defaultKingdomState;
}

async function updateKingdom(
	kingdomId: number,
	updates: Partial<KingdomState>
): Promise<boolean> {
	const response: UpdateKingdomResponse = await ky
		.patch(`/api/kingdom/${kingdomId}`, { json: { updates } })
		.json();

	if (response.status !== 200) {
		false;
	}

	return true;
}
