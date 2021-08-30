import { Request, Response, Router } from 'express';

import { verifyToken } from '../../middleware';
import { Kingdom, kingdomService } from './kingdomService';
import {
	getKingdomValidator,
	updateKingdomValidator,
} from './kingdomValidator';

export function createKingdomRouter(): Router {
	const router = Router();

	router.use(verifyToken);

	router.patch('/:id', updateKingdomValidator, updateKingdom);
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

export async function updateKingdom(
	req: Request,
	res: Response
): Promise<void> {
	const id = Number(req.params.id);

	const success = await kingdomService.updateKingdom(
		id,
		req.body as Partial<Kingdom>
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
