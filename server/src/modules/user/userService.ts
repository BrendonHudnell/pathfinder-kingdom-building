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

	const newUser = new UserEntity();
	newUser.username = username;

	const hash = await bcrypt.hash(password, env.saltRounds);

	newUser.password = hash;
	userRepository.save(newUser);

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

	const match = await bcrypt.compare(password, user.password);

	if (!match) {
		return;
	}

	const payload = {
		username,
	};

	return jwt.sign(payload, env.secretKey, { expiresIn: '7 days' });
}
