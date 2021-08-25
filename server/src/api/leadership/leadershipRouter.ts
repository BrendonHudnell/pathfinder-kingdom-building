import { Request, Response, Router } from 'express';

import { verifyToken } from '../../middleware';
import { leadershipService } from './leadershipService';
import {
	addViceroyValidator,
	getAllLeadershipRolesValidator,
} from './leadershipValidator';

export function createLeadershipRouter(): Router {
	const router = Router();

	router.use(verifyToken);

	router.get('/', getAllLeadershipRolesValidator, getAllLeadershipRoles);
	router.post('/addViceroy', addViceroyValidator, addViceroy);

	return router;
}

export async function getAllLeadershipRoles(
	req: Request,
	res: Response
): Promise<void> {
	const kingdomId = Number(req.query.kingdomId);

	const roles = await leadershipService.getAllLeadershipRoles(kingdomId);

	if (roles.length > 0) {
		res.status(200).json({
			status: 200,
			data: roles,
		});
	} else {
		res.status(200).json({
			status: 404,
		});
	}
}

export async function addViceroy(req: Request, res: Response): Promise<void> {
	const kingdomId = req.body.kingdomId;

	const viceroy = await leadershipService.addViceroy(kingdomId);

	if (viceroy) {
		res.status(200).json({
			status: 200,
			data: viceroy,
		});
	} else {
		res.status(200).json({
			status: 404,
		});
	}
}
