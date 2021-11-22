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

export interface UpdateDistrictResponse {
	status: number;
}

export const districtApi = {
	getAllDistricts,
	addDistrict,
	updateDistrict,
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
		.post('/api/district/create', { json: { kingdomId, settlementId } })
		.json();

	if (response.status !== 200) {
		return;
	}

	return response.data ?? undefined;
}

async function updateDistrict(
	districtId: number,
	updates: Partial<District>
): Promise<boolean> {
	const response: UpdateDistrictResponse = await ky
		.patch(`/api/district/${districtId}`, { json: { updates } })
		.json();

	if (response.status !== 200) {
		false;
	}

	return true;
}
