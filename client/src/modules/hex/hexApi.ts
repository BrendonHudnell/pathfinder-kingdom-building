import ky from 'ky';

import { HexData } from './hexSlice';

export const hexApi = {
	getAllHexes,
};

async function getAllHexes(kingdomId: number): Promise<HexData[]> {
	const response = await ky
		.get('/api/hex', { searchParams: { kingdomId } })
		.json();

	return response as HexData[];
}
