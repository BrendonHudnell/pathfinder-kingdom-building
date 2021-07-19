import ky from 'ky';

import { Settlement } from './settlementSlice';

export interface SettlementResponse {
	status: number;
	data?: Settlement[];
}

export const settlementApi = {
	getAllSettlements,
};

async function getAllSettlements(kingdomId: number): Promise<Settlement[]> {
	const response: SettlementResponse = await ky
		.get('/api/settlement', { searchParams: { kingdomId } })
		.json();

	if (response.status !== 200) {
		return [];
	}

	return response.data ?? [];
}
