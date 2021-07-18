import ky from 'ky';

import { District } from './districtSlice';

export const districtApi = {
	getAllDistricts,
};

async function getAllDistricts(kingdomId: number): Promise<District[]> {
	const response = await ky
		.get('/api/district', { searchParams: { kingdomId } })
		.json();

	return response as District[];
}
