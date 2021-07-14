import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { KingdomEntity } from '../kingdom';

@Entity('leadership')
export class LeadershipEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(() => KingdomEntity, (kingdom) => kingdom.leadershipRoles)
	kingdom!: KingdomEntity;

	@Column({ length: 14 })
	name!: string;

	@Column()
	heldBy!: string;

	@Column({ length: 12 })
	attribute!: string;

	@Column()
	abilityBonus!: number;

	@Column()
	leadership!: boolean;

	@Column({ length: 33 })
	benefit!: string;

	@Column()
	vacant!: boolean;

	@Column()
	skillBonus!: number;
}
