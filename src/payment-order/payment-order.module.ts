import { Module } from '@nestjs/common';
import { PaymentOrderController } from './payment-order.controller';
import { PaymentOrderService } from './payment-order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentOrderRepository } from './payment-order.repository';
import { ArticlesModule } from 'src/articles/articles.module';
import { ArticleRepository } from 'src/articles/article.repository';
import { OrderToArticleModule } from 'src/order-to-article/order-to-article.module';

@Module({
	providers: [PaymentOrderService],
	controllers: [PaymentOrderController],
	imports: [
		TypeOrmModule.forFeature([PaymentOrderRepository]),
		ArticlesModule,
		OrderToArticleModule
	],
})
export class PaymentOrderModule {}
