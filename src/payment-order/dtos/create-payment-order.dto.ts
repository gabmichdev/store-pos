import { IsNotEmpty, IsString, IsDate, IsUUID, IsArray, ValidateNested, IsDateString } from 'class-validator';
import { Article } from 'src/articles/article.entity';
import { ArticleUpdate } from '../article-update.interface';

export class CreatePaymentOrderDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	description: string;

	@IsArray() articles: ArticleUpdate[];
}
