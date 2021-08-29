import { Request, Response, Router } from 'express';

import { verifyToken } from '../../middleware';
import { Hex, hexService } from './hexService';
import { getAllHexesValidator, updateHexValidator } from './hexValidator';

export function createHexRouter(): Router {
	const router = Router();

	router.use(verifyToken);

	router.patch('/:id', updateHexValidator, updateHex);
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

export async function updateHex(req: Request, res: Response): Promise<void> {
	const id = Number(req.params.id);

	const success = await hexService.updateHex(id, req.body as Partial<Hex>);

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
