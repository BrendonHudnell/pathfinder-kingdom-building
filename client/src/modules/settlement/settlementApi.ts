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

export interface UpdateSettlementResponse {
	status: number;
}

export const settlementApi = {
	getAllSettlements,
	addSettlement,
	updateSettlement,
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

async function updateSettlement(
	settlementId: number,
	updates: Partial<Settlement>
): Promise<boolean> {
	const response: UpdateSettlementResponse = await ky
		.patch(`/api/settlement/${settlementId}`, { json: { updates } })
		.json();

	if (response.status !== 200) {
		false;
	}

	return true;
}
