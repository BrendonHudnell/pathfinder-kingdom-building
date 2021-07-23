import ky from 'ky';

import { Settlement } from './settlementSlice';

export interface GetAllSettlementsResponse {
	status: number;
	data?: Settlement[];
}

export interface AddSettlementResponse {
	status: number;
	data?: Settlement;
}

export const settlementApi = {
	getAllSettlements,
	addSettlement,
};

async function getAllSettlements(kingdomId: number): Promise<Settlement[]> {
	const response: GetAllSettlementsResponse = await ky
		.get('/api/settlement', { searchParams: { kingdomId } })
		.json();

	if (response.status !== 200) {
		return [];
	}

	return response.data ?? [];
}

async function addSettlement(
	kingdomId: number,
	hexId: number
): Promise<Settlement | undefined> {
	const response: AddSettlementResponse = await ky
		.get('/api/settlement/add', { json: { kingdomId, hexId } })
		.json();

	if (response.status !== 200) {
		return;
	}

	return response.data ?? undefined;
}
