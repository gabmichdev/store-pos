import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { User } from 'src/users/user.entity';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
	constructor(private userService: UsersService, private jwtService: JwtService) {}

	async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
		return this.userService.signUp(authCredentialsDto);
	}

	async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
		const user = await this.userService.signIn(authCredentialsDto);
		if (!user) {
			throw new UnauthorizedException('Invalid credentials');
		}
		const payload: JwtPayload = { email: user.email };
		const accessToken = await this.jwtService.sign(payload);
		return { accessToken };
	}
}
