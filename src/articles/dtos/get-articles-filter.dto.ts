import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetArticlesFilterDto {
	@IsOptional() name: string;

	@IsOptional()
	@IsNotEmpty()
	search: string;
}
