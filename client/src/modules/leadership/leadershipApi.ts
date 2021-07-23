import ky from 'ky';

import { Role } from './leadershipSlice';

export interface GetAllRolesResponse {
	status: number;
	data?: Role[];
}

export interface AddViceroyResponse {
	status: number;
	data?: Role;
}

export const leadershipApi = {
	getAllRoles,
	addViceroy,
};

async function getAllRoles(kingdomId: number): Promise<Role[]> {
	const response: GetAllRolesResponse = await ky
		.get('/api/leadership', { searchParams: { kingdomId } })
		.json();

	if (response.status !== 200) {
		return [];
	}

	return response.data ?? [];
}

async function addViceroy(kingdomId: number): Promise<Role | undefined> {
	const response: AddViceroyResponse = await ky
		.get('/api/leadership/addViceroy', { json: { kingdomId } })
		.json();

	if (response.status !== 200) {
		return;
	}

	return response.data ?? undefined;
}
