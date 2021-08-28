import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { KingdomEntity } from '../kingdom';

@Entity('user')
export class UserEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	username!: string;

	@Column()
	password!: string;

	// @Column()
	// refreshToken!: string;

	@OneToMany(() => KingdomEntity, (kingdom) => kingdom.user)
	kingdoms!: KingdomEntity[];
}
