import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { env } from '../env';

export async function withAuth(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<any> {
	const token = req.cookies.token;

	if (!token) {
		res.status(401).send('Unauthorized: No token provided.');
	} else {
		jwt.verify(token, env.secretKey, (err: VerifyErrors | null) => {
			if (err) {
				res.status(401).send('Unauthorized: Invalid token.');
			} else {
				return next();
			}
		});
	}
}
