import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import { AuthCredentialsDto } from 'src/auth/dtos/auth-credentials.dto';

@Injectable()
export class UsersService {
	constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}
	async findById(userId: string): Promise<User> {
		const user = await this.userRepository.findOne(userId);
		if (!user) {
			throw new NotFoundException(`User with ID ${userId} not found`);
		}
		return user;
	}

	async signIn(authCredentialsDto: AuthCredentialsDto): Promise<User | null> {
		return await this.userRepository.validateUser(authCredentialsDto);
	}

	async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
		return await this.userRepository.signUp(authCredentialsDto);
	}
}
