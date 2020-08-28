import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleRepository } from './article.repository';

@Module({
	controllers: [ArticlesController],
	providers: [ArticlesService],
	imports: [TypeOrmModule.forFeature([ArticleRepository])],
	exports: [TypeOrmModule]
})
export class ArticlesModule {}
