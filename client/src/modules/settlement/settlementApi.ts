import ky from 'ky';

import { Settlement } from './settlementSlice';

export const settlementApi = {
	getAllSettlements,
};

async function getAllSettlements(kingdomId: number): Promise<Settlement[]> {
	const response = await ky
		.get('/api/settlement', { searchParams: { kingdomId } })
		.json();

	return response as Settlement[];
}
