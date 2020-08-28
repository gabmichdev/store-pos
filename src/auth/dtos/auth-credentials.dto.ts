import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator';

export class AuthCredentialsDto {
	@IsEmail() 
	email: string;

	@MinLength(8)
	@MaxLength(20)
	@IsString()
	password: string;
}
