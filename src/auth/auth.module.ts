import * as config from 'config';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './auth-jwt.strategy';
import { UserRepository } from 'src/users/users.repository';
import { UsersModule } from 'src/users/users.module';

const jwtConfig = config.get('jwt');
@Module({
	imports: [
		UsersModule,
		TypeOrmModule.forFeature([UserRepository]),
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({
			secret: jwtConfig.secret,
			signOptions: {
				expiresIn: jwtConfig.expiresIn,
			},
		}),
	],
	providers: [AuthService, JwtStrategy],
	controllers: [AuthController],
	exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
