import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;
}
