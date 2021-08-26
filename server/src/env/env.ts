import dotenv from 'dotenv';

dotenv.config();

/* istanbul ignore next */
export const env = {
	dbHost: process.env.DB_HOST ?? 'localhost',
	dbUser: process.env.DB_USER ?? 'local',
	dbPassword: process.env.DB_PASS ?? 'local',
	dbDatabase: process.env.DB_DBASE ?? 'pathfinder',
	dbPort: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
	dbDropSchema: process.env.DB_DROP_SCHEMA
		? process.env.DB_DROP_SCHEMA === 'true'
		: true,
	dbSynchronize: process.env.DB_SYNCHRONIZE
		? process.env.DB_SYNCHRONIZE === 'true'
		: true,
	saltRounds: process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10,
	secretKey: process.env.SECRET_KEY ?? 'Testing Secret',
	expiration: process.env.EXPIRATION ? parseInt(process.env.EXPIRATION) : 3600, // 1 hour TODO change to 1 minute with refresh token
	// refreshExpiration: process.env.REFRESH_EXPIRATION
	// 	? parseInt(process.env.REFRESH_EXPIRATION)
	// 	: 120, // 5 minutes
};
