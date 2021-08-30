import { Request, Response, Router } from 'express';

import { verifyToken } from '../../middleware';
import { Lot, lotService } from './lotService';
import { updateLotValidator } from './lotValidator';

export function createLotRouter(): Router {
	const router = Router();

	router.use(verifyToken);

	router.patch('/:id', updateLotValidator, updateLot);

	return router;
}

export async function updateLot(req: Request, res: Response): Promise<void> {
	const id = Number(req.params.id);

	const success = await lotService.updateLot(id, req.body as Partial<Lot>);

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
