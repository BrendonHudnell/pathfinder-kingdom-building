import ky from 'ky';

import { HexData } from './hexSlice';

export interface GetAllHexesResponse {
	status: number;
	data?: HexData[];
}

export interface UpdateHexResponse {
	status: number;
}

export const hexApi = {
	getAllHexes,
	updateHex,
};

async function getAllHexes(kingdomId: number): Promise<HexData[]> {
	const response: GetAllHexesResponse = await ky
		.get('/api/hex', { searchParams: { kingdomId } })
		.json();

	if (response.status !== 200) {
		return [];
	}

	return response.data ?? [];
}

async function updateHex(
	hexId: number,
	updates: Partial<HexData>
): Promise<boolean> {
	const response: UpdateHexResponse = await ky
		.patch(`/api/hex/${hexId}`, { json: { updates } })
		.json();

	if (response.status !== 200) {
		false;
	}

	return true;
}
