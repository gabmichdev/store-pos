import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as config from 'config';

import { AuthService } from './auth.service';
import { JwtPayload } from './jwt-payload.interface';
import { User } from 'src/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private authService: AuthService,
		@InjectRepository(UserRepository) private userRepository: UserRepository
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: config.get('jwt.secret'),
		});
	}

	async validate(payload: JwtPayload): Promise<User> {
		const { email } = payload;
		const user = await this.userRepository.findOne({ email });

		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
