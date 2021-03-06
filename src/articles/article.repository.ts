import { Repository, EntityRepository } from 'typeorm';
import { Article } from './article.entity';
import { CreateArticleDto } from './dtos/create-article.dto';
import { GetArticlesFilterDto } from './dtos/get-articles-filter.dto';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {
	async getArticles(getArticlesFilterDto: GetArticlesFilterDto): Promise<Article[]> {
		const { name, search, limit, skip } = getArticlesFilterDto;
		const query = this.createQueryBuilder('article');
		if (name) {
			query.andWhere('article.name = :name', { name });
		}
		if (search) {
			query.andWhere('(article.name LIKE :search OR article.description LIKE :search)', {
				search: `%${search}%`,
			});
		}
		try {
			const articles = await query
				.take(limit && limit > 0 ? limit : 10)
				.skip(skip && skip > 0 ? skip : 0)
				.getMany();
			return articles;
		} catch (err) {
			throw new InternalServerErrorException('Error occurred while retrieving articles');
		}
	}

	async createArticle(createArticleDto: CreateArticleDto): Promise<Article> {
		const { name, description } = createArticleDto;

		const article = new Article();
		article.name = name;
		article.description = description;

		await article.save();

		return article;
	}
}
