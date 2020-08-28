import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { PaymentOrderModule } from './payment-order/payment-order.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrderToArticleModule } from './order-to-article/order-to-article.module';

@Module({
	imports: [ArticlesModule, TypeOrmModule.forRoot(typeOrmConfig), PaymentOrderModule, AuthModule, UsersModule, OrderToArticleModule],
})
export class AppModule {}
