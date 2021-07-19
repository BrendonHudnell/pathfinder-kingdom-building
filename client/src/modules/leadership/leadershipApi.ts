import ky from 'ky';

import { Role } from './leadershipSlice';

export interface LeadershipResponse {
	status: number;
	data?: Role[];
}

export const leadershipApi = {
	getAllRoles,
};

async function getAllRoles(kingdomId: number): Promise<Role[]> {
	const response: LeadershipResponse = await ky
		.get('/api/leadership', { searchParams: { kingdomId } })
		.json();

	if (response.status !== 200) {
		return [];
	}

	return response.data ?? [];
}
