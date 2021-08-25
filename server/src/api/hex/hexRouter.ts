import { Request, Response, Router } from 'express';

import { verifyToken } from '../../middleware';
import { hexService } from './hexService';
import { getAllHexesValidator } from './hexValidator';

export function createHexRouter(): Router {
	const router = Router();

	router.use(verifyToken);

	router.get('/', getAllHexesValidator, getAllHexes);

	return router;
}

export async function getAllHexes(req: Request, res: Response): Promise<void> {
	const kingdomId = Number(req.query.kingdomId);

	const hexes = await hexService.getAllHexes(kingdomId);

	if (hexes.length > 0) {
		res.status(200).json({
			status: 200,
			data: hexes,
		});
	} else {
		res.status(200).json({
			status: 404,
		});
	}
}
