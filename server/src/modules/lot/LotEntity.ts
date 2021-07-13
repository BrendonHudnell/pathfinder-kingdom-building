import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DistrictEntity } from '../district';

@Entity('lot')
export class LotEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(() => DistrictEntity, (district) => district.lots)
	district!: DistrictEntity;

	@Column({ length: 25, nullable: true })
	lotType?: string;
}
