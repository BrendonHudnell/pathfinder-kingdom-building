import { Request, Response, Router } from 'express';

import { settlementService } from './settlementService';
import { getAllSettlementsValidator } from './settlementValidator';

export function createSettlementRouter(): Router {
	const router = Router();

	router.get('/', getAllSettlementsValidator, getAllSettlements);

	return router;
}

export async function getAllSettlements(
	req: Request,
	res: Response
): Promise<void> {
	const kingdomId = Number(req.query.kingdomId);

	const settlements = await settlementService.getAllSettlements(kingdomId);

	if (settlements.length > 0) {
		res.status(200).json(settlements);
	} else {
		res.sendStatus(404);
	}
}
