import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

import { createApiRouter } from '../api';

export function createApp(): Express {
	const app = express();

	app.use(cors());

	app.use(express.json());

	app.use(express.urlencoded({ extended: true }));

	app.use(cookieParser());

	app.use(
		express.static(path.join(__dirname, '..', '..', '..', 'client', 'build'))
	);

	app.use('/api', createApiRouter());

	/* istanbul ignore next */
	app.get('/*', (req: Request, res: Response): void => {
		res
			.status(200)
			.sendFile(
				path.join(__dirname, '..', '..', '..', 'client', 'build', 'index.html')
			);
	});

	return app;
}
