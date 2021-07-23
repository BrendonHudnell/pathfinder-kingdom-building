import ky from 'ky';

import { District } from './districtSlice';

export interface GetAllDistrictsResponse {
	status: number;
	data?: District[];
}

export interface AddDistrictResponse {
	status: number;
	data?: District;
}

export const districtApi = {
	getAllDistricts,
	addDistrict,
};

async function getAllDistricts(kingdomId: number): Promise<District[]> {
	const response: GetAllDistrictsResponse = await ky
		.get('/api/district', { searchParams: { kingdomId } })
		.json();

	if (response.status !== 200) {
		return [];
	}

	return response.data ?? [];
}

async function addDistrict(
	kingdomId: number,
	settlementId: number
): Promise<District | undefined> {
	const response: AddDistrictResponse = await ky
		.get('/api/district/add', { json: { kingdomId, settlementId } })
		.json();

	if (response.status !== 200) {
		return;
	}

	return response.data ?? undefined;
}
