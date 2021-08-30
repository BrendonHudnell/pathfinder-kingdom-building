import { Request, Response, Router } from 'express';

import { createDistrictRouter } from './district';
import { createHexRouter } from './hex';
import { createKingdomRouter } from './kingdom';
import { createLeadershipRouter } from './leadership';
import { createLotRouter } from './lot';
import { createSettlementRouter } from './settlement';
import { createUserRouter } from './user';

export function createApiRouter(): Router {
	const router = Router();

	router.use('/kingdom', createKingdomRouter());
	router.use('/hex', createHexRouter());
	router.use('/settlement', createSettlementRouter());
	router.use('/district', createDistrictRouter());
	router.use('/leadership', createLeadershipRouter());
	router.use('/lot', createLotRouter());
	router.use('/user', createUserRouter());

	router.all('/', (req: Request, res: Response): void => {
		res.status(200).send('You have reached the API');
	});

	router.all('/*', (req: Request, res: Response): void => {
		res.sendStatus(404);
	});

	return router;
}
