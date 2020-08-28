import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PaymentOrderRepository } from './payment-order.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { GetPaymentOrdersFilterDto } from './dtos/get-payment-orders-filter.dto';
import { UpdatePaymentOrderDto } from './dtos/update-payment-order.dto';
import { PaymentOrder } from './payment-order.entity';
import { CreatePaymentOrderDto } from './dtos/create-payment-order.dto';
import { OrderToArticle } from 'src/order-to-article/order-to-article.entity';
import { ArticleRepository } from 'src/articles/article.repository';
import { Article } from 'src/articles/article.entity';
import { OrderToArticleRepository } from 'src/order-to-article/order-to-article.repository';
import { ArticleUpdate } from './article-update.interface';

@Injectable()
export class PaymentOrderService {
	constructor(
		@InjectRepository(PaymentOrderRepository) private paymentOrderRepository: PaymentOrderRepository,
		@InjectRepository(ArticleRepository) private articleRepository: ArticleRepository,
		@InjectRepository(OrderToArticleRepository) private orderToArticleRepository: OrderToArticleRepository
	) {}

	async getPaymentOrders(paymentOrderFilterDto: GetPaymentOrdersFilterDto): Promise<PaymentOrder[]> {
		return await this.paymentOrderRepository.getPaymentOrders(paymentOrderFilterDto);
	}

	async getPaymentOrder(paymentOrderId: number): Promise<PaymentOrder> {
		const paymentOrder = await this.paymentOrderRepository.findOne(paymentOrderId);
		if (!paymentOrder) {
			throw new NotFoundException('Payment order not found');
		}
		return paymentOrder;
	}

	async createPaymentOrder(createPaymentOrderDto: CreatePaymentOrderDto): Promise<PaymentOrder> {
		const articles = await this.articleRepository.findByIds(
			createPaymentOrderDto.articles.map((article: ArticleUpdate) => article.id)
		);
		if (articles.length === 0) {
			throw new NotFoundException('None of the articles in the request exist!');
		}
		const paymentOrder = await this.paymentOrderRepository.createPaymentOrder(createPaymentOrderDto);
		for (let i = 0; i < articles.length; i++) {
			const newOrderToArticle = new OrderToArticle();
			newOrderToArticle.articleCount = createPaymentOrderDto.articles[i].amount;
			newOrderToArticle.article = articles[i];
			newOrderToArticle.paymentOrder = paymentOrder;
			articles[i].ordered += createPaymentOrderDto.articles[i].amount;
			await articles[i].save();
			await newOrderToArticle.save();
		}
		return paymentOrder;
	}

	async deletePaymentOrder(paymentOrderId: number): Promise<void> {
		const deletionResult = await this.paymentOrderRepository.delete(paymentOrderId);
		if (deletionResult.affected === 0) {
			throw new NotFoundException('Payment order does not exist');
		}
	}
	
	async updatePaymentOrder(paymentOrderId: number, updatePaymentOrderDto: UpdatePaymentOrderDto): Promise<void> {
		const paymentOrder = await this.getPaymentOrder(paymentOrderId);
		const { name, description } = updatePaymentOrderDto;
		await this.orderToArticleRepository
			.createQueryBuilder()
			.delete()
			.where('order_to_article.paymentOrderId = ' + paymentOrderId)
			.execute();
		const articles = await this.articleRepository.findByIds(
			updatePaymentOrderDto.articles.map((article: ArticleUpdate) => article.id)
		);
		if (articles.length !== updatePaymentOrderDto.articles.length) {
			throw new BadRequestException('Some of the articles do not exist');
		}
		for (let i = 0; i < articles.length; i++) {
			const newOrderToArticle = new OrderToArticle();
			newOrderToArticle.articleCount = updatePaymentOrderDto.articles[i].amount;
			newOrderToArticle.article = articles[i];
			newOrderToArticle.paymentOrder = paymentOrder;
			articles[i].ordered += updatePaymentOrderDto.articles[i].amount;
			await articles[i].save();
			await newOrderToArticle.save();
		}
		const update = await this.paymentOrderRepository.update(paymentOrderId, { name, description });
	}
}
