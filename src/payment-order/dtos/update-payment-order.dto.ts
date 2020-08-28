import { IsOptional, IsNotEmpty, IsISO8601, IsArray, ArrayNotEmpty } from 'class-validator';
import { ArticleUpdate } from '../article-update.interface';

export class UpdatePaymentOrderDto {
	@IsOptional() name: string;

	@IsOptional() description: string;

	@IsOptional()
	@IsNotEmpty()
	@IsISO8601()
	date: string;

	@IsArray()
	@ArrayNotEmpty()
	articles: ArticleUpdate[];
}
