import { IsOptional, IsNotEmpty, IsInt } from 'class-validator';

export class GetArticlesFilterDto {
	@IsOptional() name: string;

	@IsOptional()
	@IsNotEmpty()
	search: string;

	@IsOptional() limit: number;

	@IsOptional() skip: number;
}
