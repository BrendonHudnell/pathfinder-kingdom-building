import { Request, Response, Router } from 'express';

import { verifyToken } from '../../middleware';
import { LeadershipRole, leadershipService } from './leadershipService';
import {
	createViceroyValidator,
	getAllLeadershipRolesValidator,
	updateLeadershipRoleValidator,
} from './leadershipValidator';

export function createLeadershipRouter(): Router {
	const router = Router();

	router.use(verifyToken);

	router.post('/createViceroy', createViceroyValidator, createViceroy);
	router.patch('/:id', updateLeadershipRoleValidator, updateLeadershipRole);
	router.get('/', getAllLeadershipRolesValidator, getAllLeadershipRoles);

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

export async function createViceroy(
	req: Request,
	res: Response
): Promise<void> {
	const kingdomId = req.body.kingdomId;

	const viceroy = await leadershipService.createViceroy(kingdomId);

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

export async function updateLeadershipRole(
	req: Request,
	res: Response
): Promise<void> {
	const id = Number(req.params.id);

	const success = await leadershipService.updateLeadershipRole(
		id,
		req.body as Partial<LeadershipRole>
	);

	if (success) {
		res.status(200).json({
			status: 200,
		});
	} else {
		res.status(200).json({
			status: 404,
		});
	}
}
