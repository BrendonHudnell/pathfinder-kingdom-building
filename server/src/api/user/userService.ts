import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import crypto from 'crypto';

import { env } from '../../env';
import { kingdomService } from '../kingdom';
import { hexService } from '../hex';
import { leadershipService } from '../leadership';
import { UserEntity } from './userEntity';

export interface UserToken {
	accessToken: string;
	accessTokenExpiration: Date;
	// refreshToken: string;
}

export const userService = {
	register,
	login,
	logout,
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
	const createdUser = await userRepository.save(newUser);

	const kingdom = await kingdomService.generateKingdom(createdUser);
	await hexService.generateHexBoard(kingdom);
	await leadershipService.generateLeadershipRoles(kingdom);

	return true;
}

async function login(
	username: string,
	password: string
): Promise<UserToken | undefined> {
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
	};

	const accessTokenExpiration = new Date(Date.now() + env.expiration * 1000);
	const accessToken = jwt.sign(payload, env.secretKey, {
		expiresIn: env.expiration,
	});
	// const refreshToken = crypto.randomBytes(16).toString("hex");

	// user.refreshToken = refreshToken;
	// await userRepository.save(user);

	return {
		accessToken,
		accessTokenExpiration,
		// refreshToken
	};
}

async function logout(userId: number): Promise<void> {
	console.log(userId);
	// TODO remove the refresh token when implemented
}
