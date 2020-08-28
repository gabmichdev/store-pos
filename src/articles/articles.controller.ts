import {
	Controller,
	Get,
	Param,
	Post,
	Body,
	ValidationPipe,
	UsePipes,
	Delete,
	Query,
	Put,
	UseGuards,
} from '@nestjs/common';

import { ArticlesService } from './articles.service';
import { Article } from './article.entity';
import { CreateArticleDto } from './dtos/create-article.dto';
import { GetArticlesFilterDto } from './dtos/get-articles-filter.dto';
import { UpdateArticleDto } from './dtos/update-article.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('articles')
@UseGuards(JwtAuthGuard)
export class ArticlesController {
	constructor(private articleService: ArticlesService) {}

	@Get('/popular')
	async getMostPopularArticles(@Query('count') count: number): Promise<Article[]> {
		return await this.articleService.getPopularArticles(count);
	}

	@Get('/')
	async getArticles(@Query(ValidationPipe) getArticlesFilterDto: GetArticlesFilterDto): Promise<Article[]> {
		return await this.articleService.getArticles(getArticlesFilterDto);
	}

	@Get('/:articleId')
	async getArticleById(@Param('articleId') articleId: number): Promise<Article> {
		return await this.articleService.getArticleById(articleId);
	}

	@Post('/')
	@UsePipes(ValidationPipe)
	async createArticle(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
		return await this.articleService.createArticle(createArticleDto);
	}

	@Put('/:articleId')
	@UsePipes(ValidationPipe)
	async updateArticle(
		@Param('articleId') articleId: number,
		@Body() updateArticleDto: UpdateArticleDto
	): Promise<void> {
		await this.articleService.updateArticle(articleId, updateArticleDto);
	}

	@Delete('/:articleId')
	async deleteArticle(@Param('articleId') articleId: number): Promise<void> {
		await this.articleService.deleteArticle(articleId);
	}
}
