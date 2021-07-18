import ky from 'ky';

import { Role } from './leadershipSlice';

export const leadershipApi = {
	getAllRoles,
};

async function getAllRoles(kingdomId: number): Promise<Role[]> {
	const response = await ky
		.get('/api/leadership', { searchParams: { kingdomId } })
		.json();

	return response as Role[];
}
