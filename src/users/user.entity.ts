import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { PaymentOrder } from 'src/payment-order/payment-order.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
	@PrimaryGeneratedColumn('uuid') id: string;
	@Column({ unique: true })
	email: string;
	@Column() password: string;
	@Column() salt: string;

	async validatePassword(password: string): Promise<boolean> {
		const hash = await bcrypt.hash(password, this.salt);
		return hash === this.password;
	}
}
