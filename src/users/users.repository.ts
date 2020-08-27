import { Repository, EntityRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { AuthCredentialsDto } from 'src/auth/dtos/auth-credentials.dto';
import { ConflictException, InternalServerErrorException, Injectable } from '@nestjs/common';

@Injectable()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
	async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
		const { email, password } = authCredentialsDto;

		const user = new User();
		user.email = email;
		user.salt = await bcrypt.genSalt();
		user.password = await this.hashPassword(password, user.salt);

		try {
			await user.save();
		} catch (err) {
			if (err.code === 'ER_DUP_ENTRY') {
				throw new ConflictException('Email is taken');
			}
			else {
				throw new InternalServerErrorException();
			}
		}
	}

	async validateUser(authCredentialsDto: AuthCredentialsDto): Promise<User | null> {
		const { email, password } = authCredentialsDto;
		const user = await this.findOne({ email });
		if (user && (await user.validatePassword(password))) {
			return user;
		}
		else {
			return null;
		}
	}

	private async hashPassword(password: string, salt: string): Promise<string> {
		return bcrypt.hash(password, salt);
	}
}
