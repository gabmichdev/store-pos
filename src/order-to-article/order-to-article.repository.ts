import { Repository, EntityRepository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { OrderToArticle } from './order-to-article.entity';

@EntityRepository(OrderToArticle)
export class OrderToArticleRepository extends Repository<OrderToArticle> {}