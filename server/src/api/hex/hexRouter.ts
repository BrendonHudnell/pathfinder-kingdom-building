import { Request, Response, Router } from 'express';

import { verifyToken } from '../../middleware';
import { Hex, hexService } from './hexService';
import { getAllHexesValidator, updateHexValidator } from './hexValidator';

export function createHexRouter(): Router {
	const router = Router();

	router.use(verifyToken);

	router.get('/', getAllHexesValidator, getAllHexes);
	router.patch('/:id', updateHexValidator, updateHex);

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

	const hex = await hexService.updateHex(id, req.body as Partial<Hex>);

	if (hex) {
		res.status(200).json({
			status: 200,
			data: hex,
		});
	} else {
		res.status(200).json({
			status: 404,
		});
	}
}
