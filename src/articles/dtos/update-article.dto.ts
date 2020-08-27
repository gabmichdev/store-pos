import { IsNotEmpty } from 'class-validator';

export class UpdateArticleDto {
	@IsNotEmpty() name: string;

	@IsNotEmpty() description: string;
}
