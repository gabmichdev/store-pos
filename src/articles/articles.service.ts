import { Injectable, NotFoundException, Global } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ArticleRepository } from './article.repository';
import { Article } from './article.entity';
import { CreateArticleDto } from './dtos/create-article.dto';
import { GetArticlesFilterDto } from './dtos/get-articles-filter.dto';
import { UpdateArticleDto } from './dtos/update-article.dto';

@Injectable()
export class ArticlesService {
	constructor(@InjectRepository(ArticleRepository) private articleRepository: ArticleRepository) {}

	async getArticles(getArticlesFilterDto: GetArticlesFilterDto): Promise<Article[]> {
		return await this.articleRepository.getArticles(getArticlesFilterDto);
	}

	async getArticleById(articleId: number): Promise<Article> {
		const article = await this.articleRepository.findOne(articleId);
		if (!article) {
			throw new NotFoundException(`Article with ID ${articleId} not found`);
		}
		return article;
	}

	async createArticle(createArticleDto: CreateArticleDto): Promise<Article> {
		return await this.articleRepository.createArticle(createArticleDto);
	}

	async updateArticle(articleId: number, updateArticleDto: UpdateArticleDto): Promise<void> {
		await this.articleRepository.update(articleId, updateArticleDto);
	}

	async deleteArticle(articleId: number): Promise<void> {
		const deletionResult = await this.articleRepository.delete(articleId);
		if (deletionResult.affected === 0) {
			throw new NotFoundException(`Article with ID ${articleId} could not be deleted`);
		}
	}

	async getPopularArticles(count: number): Promise<Article[]> {
		const popularArticles = await this.articleRepository
			.createQueryBuilder()
			.orderBy('article.ordered', 'DESC')
			.limit(count && count > 1 ? count : 1)
			.getMany();
		return popularArticles;
	}
}
