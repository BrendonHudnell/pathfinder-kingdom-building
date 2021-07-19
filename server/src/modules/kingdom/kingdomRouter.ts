import { Request, Response, Router } from 'express';

import { kingdomService } from './kingdomService';
import { getKingdomValidator } from './kingdomValidator';

export function createKingdomRouter(): Router {
	const router = Router();

	router.get('/', getKingdomValidator, getKingdom);

	return router;
}

export async function getKingdom(req: Request, res: Response): Promise<void> {
	const id = Number(req.query.id);

	const kingdom = await kingdomService.getKingdom(id);

	if (kingdom) {
		res.status(200).json({
			status: 200,
			data: kingdom,
		});
	} else {
		res.status(200).json({
			status: 404,
		});
	}
}
