import { Request, Response, Router } from 'express';
import { withAuth } from '../../middleware';

import { userService } from './userService';
import { loginValidator, registerValidator } from './userValidator';

export function createUserRouter(): Router {
	const router = Router();

	router.post('/register', registerValidator, register);
	router.post('/login', loginValidator, login);
	router.get('/checkToken', withAuth, checkToken);

	return router;
}

export async function register(req: Request, res: Response): Promise<void> {
	const username = req.body.username;
	const password = req.body.password;

	const success = await userService.register(username, password);

	if (success) {
		res.status(201).json({ message: 'User registration success.' });
	} else {
		res.status(409).json({ message: 'Username already exists.' });
	}
}

export async function login(req: Request, res: Response): Promise<void> {
	const username = req.body.username;
	const password = req.body.password;

	const token = await userService.login(username, password);

	if (token) {
		res.cookie('token', token, { httpOnly: true }).sendStatus(200);
	} else {
		res
			.status(401)
			.json({ message: 'Username/password combination incorrect.' });
	}
}

export async function checkToken(req: Request, res: Response): Promise<void> {
	res.sendStatus(200);
}
