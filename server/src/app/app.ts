import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

import { createKingdomRouter } from '../modules/kingdom';
import { createHexRouter } from '../modules/hex';
import { createSettlementRouter } from '../modules/settlement';
import { createDistrictRouter } from '../modules/district';
import { createLeadershipRouter } from '../modules/leadership';
import { createUserRouter } from '../modules/user';

export function createApp(): Express {
	const app = express();

	app.use(cors());

	app.use(express.json());

	app.use(express.urlencoded({ extended: true }));

	app.use(cookieParser());

	app.use(
		express.static(path.join(__dirname, '..', '..', '..', 'client', 'build'))
	);

	app.use('/api/kingdom', createKingdomRouter());
	app.use('/api/hex', createHexRouter());
	app.use('/api/settlement', createSettlementRouter());
	app.use('/api/district', createDistrictRouter());
	app.use('/api/leadership', createLeadershipRouter());
	app.use('/api', createUserRouter());

	app.get('/api', (req: Request, res: Response): void => {
		res.status(200).send('You have reached the API');
	});

	app.get('/api/*', (req: Request, res: Response): void => {
		res.sendStatus(404);
	});

	/* istanbul ignore next */
	app.get('*', (req: Request, res: Response): void => {
		res
			.status(200)
			.sendFile(
				path.join(__dirname, '..', '..', '..', 'client', 'build', 'index.html')
			);
	});

	return app;
}
