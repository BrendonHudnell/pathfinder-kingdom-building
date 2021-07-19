import ky from 'ky';

import { HexData } from './hexSlice';

export interface HexResponse {
	status: number;
	data?: HexData[];
}

export const hexApi = {
	getAllHexes,
};

async function getAllHexes(kingdomId: number): Promise<HexData[]> {
	const response: HexResponse = await ky
		.get('/api/hex', { searchParams: { kingdomId } })
		.json();

	if (response.status !== 200) {
		return [];
	}

	return response.data ?? [];
}
