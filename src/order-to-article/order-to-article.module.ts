import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderToArticle } from './order-to-article.entity';
import { OrderToArticleRepository } from './order-to-article.repository';

@Module({
    imports: [TypeOrmModule.forFeature([OrderToArticleRepository])],
    exports: [TypeOrmModule]
})
export class OrderToArticleModule {}
