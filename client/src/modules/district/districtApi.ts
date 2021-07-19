import ky from 'ky';

import { District } from './districtSlice';

export interface DistrictResponse {
	status: number;
	data?: District[];
}

export const districtApi = {
	getAllDistricts,
};

async function getAllDistricts(kingdomId: number): Promise<District[]> {
	const response: DistrictResponse = await ky
		.get('/api/district', { searchParams: { kingdomId } })
		.json();

	if (response.status !== 200) {
		return [];
	}

	return response.data ?? [];
}
