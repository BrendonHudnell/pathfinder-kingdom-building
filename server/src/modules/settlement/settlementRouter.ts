import { Request, Response, Router } from 'express';

import { withAuth } from '../../middleware';
import { settlementService } from './settlementService';
import {
	addSettlementValidator,
	getAllSettlementsValidator,
} from './settlementValidator';

export function createSettlementRouter(): Router {
	const router = Router();

	router.get('/', getAllSettlementsValidator, getAllSettlements);
	router.post('/add', withAuth, addSettlementValidator, addSettlement);

	return router;
}

export async function getAllSettlements(
	req: Request,
	res: Response
): Promise<void> {
	const kingdomId = Number(req.query.kingdomId);

	const settlements = await settlementService.getAllSettlements(kingdomId);

	if (settlements.length > 0) {
		res.status(200).json({
			status: 200,
			data: settlements,
		});
	} else {
		res.status(200).json({
			status: 404,
		});
	}
}

export async function addSettlement(
	req: Request,
	res: Response
): Promise<void> {
	const kingdomId = req.body.kingdomId;
	const hexId = req.body.hexId;

	const settlement = await settlementService.addSettlement(kingdomId, hexId);

	if (settlement) {
		res.status(200).json({
			status: 200,
			data: settlement,
		});
	} else {
		res.status(200).json({
			status: 404,
		});
	}
}
