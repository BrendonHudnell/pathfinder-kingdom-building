import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors, TokenExpiredError } from 'jsonwebtoken';

import { env } from '../env';

export interface AccessTokenPayload {
	userId: number;
}

export async function verifyToken(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<any> {
	const accessToken = req.cookies.accessToken;
	console.log('got here 2');

	if (!accessToken) {
		res.status(401).send('Unauthorized: No token provided.');
	} else {
		jwt.verify(
			accessToken,
			env.secretKey,
			(err: VerifyErrors | null, decoded: any) => {
				if (err) {
					if (err instanceof TokenExpiredError) {
						res
							.status(403)
							.send({ message: 'Unauthorized: Access token was expired.' });
					} else {
						res
							.status(401)
							.send({ message: 'Unauthorized: Invalid access token.' });
					}
				} else {
					req.userId = (decoded as AccessTokenPayload).userId;
					next();
				}
			}
		);
	}
}
