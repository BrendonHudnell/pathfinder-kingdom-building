import { Request, Response, Router } from 'express';

import { verifyToken } from '../../middleware';
import { userService } from './userService';
import { loginValidator, registerValidator } from './userValidator';

export function createUserRouter(): Router {
	const router = Router();

	router.post('/register', registerValidator, register);
	router.post('/login', loginValidator, login);
	// router.get('/refreshToken', refreshToken);
	router.post('/logout', verifyToken, logout);

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
		res
			.cookie('accessToken', token.accessToken, {
				httpOnly: true,
				sameSite: true,
				expires: token.accessTokenExpiration,
			})
			// .cookie('refreshToken', token.refreshToken, { httpOnly: true, sameSite: true, expires: token.refreshTokenExpiration })
			.status(200)
			.json({ expires: token.accessTokenExpiration.toUTCString() });
	} else {
		res
			.status(401)
			.json({ message: 'Username/password combination incorrect.' });
	}
}

export async function logout(req: Request, res: Response): Promise<void> {
	const userId = req.userId!;

	await userService.logout(userId);

	res
		.cookie('accessToken', 'expired', {
			expires: new Date('January 1, 1970 00:00:00'),
		})
		.sendStatus(200);
}

// export async function refreshToken(req: Request, res: Response): Promise<void> {
// 	res.sendStatus(200);
// }
