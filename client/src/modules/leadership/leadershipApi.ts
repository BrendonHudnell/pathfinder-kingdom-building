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

export interface UpdateRoleResponse {
	status: number;
}

export const leadershipApi = {
	getAllRoles,
	addViceroy,
	updateRole,
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

async function updateRole(
	roleId: number,
	updates: Partial<Role>
): Promise<boolean> {
	const response: UpdateRoleResponse = await ky
		.patch(`/api/leadership/${roleId}`, { json: { updates } })
		.json();

	if (response.status !== 200) {
		false;
	}

	return true;
}
