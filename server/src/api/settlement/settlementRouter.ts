import { Request, Response, Router } from 'express';

import { verifyToken } from '../../middleware';
import { Settlement, settlementService } from './settlementService';
import {
	createSettlementValidator,
	getAllSettlementsValidator,
	updateSettlementValidator,
} from './settlementValidator';

export function createSettlementRouter(): Router {
	const router = Router();

	router.use(verifyToken);

	router.post('/create', createSettlementValidator, createSettlement);
	router.patch('/:id', updateSettlementValidator, updateSettlement);
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

export async function createSettlement(
	req: Request,
	res: Response
): Promise<void> {
	const kingdomId = req.body.kingdomId;
	const hexId = req.body.hexId;

	const settlement = await settlementService.createSettlement(kingdomId, hexId);

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

export async function updateSettlement(
	req: Request,
	res: Response
): Promise<void> {
	const id = Number(req.params.id);

	const success = await settlementService.updateSettlement(
		id,
		req.body as Partial<Settlement>
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
