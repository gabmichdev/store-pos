import { IsNotEmpty, IsString, IsArray, ArrayNotEmpty } from 'class-validator';
import { ArticleUpdate } from '../article-update.interface';

export class CreatePaymentOrderDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	description: string;

	@IsArray()
	@ArrayNotEmpty()
	articles: ArticleUpdate[];
}
