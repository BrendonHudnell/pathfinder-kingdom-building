import { Request, Response, Router } from 'express';

import { hexService } from './hexService';
import { getHexValidator } from './hexValidator';

export function createHexRouter(): Router {
	const router = Router();

	router.get('/', getHexValidator, getHex);

	return router;
}

export async function getHex(req: Request, res: Response): Promise<void> {
	const kingdomId = Number(req.query.kingdomId);

	const hex = await hexService.getAllHexes(kingdomId);

	if (hex) {
		res.status(200).json(hex);
	} else {
		res.sendStatus(404);
	}
}
