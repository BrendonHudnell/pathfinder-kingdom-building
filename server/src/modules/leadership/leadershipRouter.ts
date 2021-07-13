import { Request, Response, Router } from 'express';

import { leadershipService } from './leadershipService';
import { getAllLeadershipRolesValidator } from './leadershipValidator';

export function createLeadershipRouter(): Router {
	const router = Router();

	router.get('/', getAllLeadershipRolesValidator, getAllLeadershipRoles);

	return router;
}

export async function getAllLeadershipRoles(
	req: Request,
	res: Response
): Promise<void> {
	const kingdomId = Number(req.query.kingdomId);

	const roles = await leadershipService.getAllLeadershipRoles(kingdomId);

	if (roles) {
		res.status(200).json(roles);
	} else {
		res.sendStatus(404);
	}
}
