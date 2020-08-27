import { IsOptional, IsNotEmpty, IsISO8601, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ArticleUpdate } from '../article-update.interface';

export class UpdatePaymentOrderDto {
	@IsOptional() name: string;

	@IsOptional() description: string;

	@IsOptional()
	@IsNotEmpty()
	@IsISO8601()
	date: string;

	@IsArray() articles: ArticleUpdate[];
}
