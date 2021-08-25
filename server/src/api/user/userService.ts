import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { env } from '../../env';
import { UserEntity } from './userEntity';

export const userService = {
	register,
	login,
};

async function register(username: string, password: string): Promise<boolean> {
	const userRepository = getRepository(UserEntity);

	const user = await userRepository.findOne({ username });

	if (user) {
		return false;
	}

	const hash = await bcrypt.hash(password, env.saltRounds);

	const newUser = new UserEntity();
	newUser.username = username;
	newUser.password = hash;
	await userRepository.save(newUser);

	return true;
}

async function login(
	username: string,
	password: string
): Promise<string | undefined> {
	const userRepository = getRepository(UserEntity);

	const user = await userRepository.findOne({ username });

	if (!user) {
		return;
	}

	const isValid = await bcrypt.compare(password, user.password);

	if (!isValid) {
		return;
	}

	const payload = {
		sub: user.id,
		iat: Date.now(),
	};

	return jwt.sign(payload, env.secretKey, { expiresIn: env.expiration });
}
