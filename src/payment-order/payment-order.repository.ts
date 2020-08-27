import { EntityRepository, Repository } from 'typeorm';
import { PaymentOrder } from './payment-order.entity';
import { GetPaymentOrdersFilterDto } from './dtos/get-payment-orders-filter.dto';
import { InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { CreatePaymentOrderDto } from './dtos/create-payment-order.dto';
import { ArticleRepository } from 'src/articles/article.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/articles/article.entity';
import { OrderToArticle } from 'src/order-to-article/order-to-article.entity';
import { OrderToArticleRepository } from 'src/order-to-article/order-to-article.repository';

@EntityRepository(PaymentOrder)
export class PaymentOrderRepository extends Repository<PaymentOrder> {
	constructor() {
		super();
	}
	async getPaymentOrders(getPaymentOrdersFilterDto: GetPaymentOrdersFilterDto): Promise<PaymentOrder[]> {
		const { name, description, dateStart, dateEnd } = getPaymentOrdersFilterDto;

		const query = this.createQueryBuilder('payment_order');
		if (name) {
			query.andWhere('payment_order.name = :name', { name });
		}
		if (description) {
			query.andWhere('payment_order.description LIKE :description', { description: `%${description}%` });
		}
		if (dateStart && dateEnd) {
			if (new Date(dateStart).getTime() > new Date(dateEnd).getTime()) {
				throw new BadRequestException('Start date can not be after end date');
			}
			query.andWhere('payment_order.date >= :dateStart AND payment_order.date <= :dateEnd', {
				dateStart,
				dateEnd,
			});
		}
		else {
			if (dateStart) {
				query.andWhere('payment_order.date >= :dateStart', { dateStart });
			}
			if (dateEnd) {
				query.andWhere('payment_order.date <= :dateEnd', { dateEnd });
			}
		}

		try {
			query.leftJoinAndSelect('payment_order.orderToArticles', 'order_to_article');
			query.leftJoinAndSelect('order_to_article.article', 'article');

			const paymentOrders = await query.getMany();
			return paymentOrders;
		} catch (err) {
			console.error(err);
			throw new InternalServerErrorException('Error occurred while retrieving payment orders');
		}
	}

	async createPaymentOrder(createPaymentOrderDto: CreatePaymentOrderDto): Promise<PaymentOrder> {
		const { name, description } = createPaymentOrderDto;

		const paymentOrder = new PaymentOrder();
		paymentOrder.name = name;
		paymentOrder.description = description;
		paymentOrder.date = new Date().toISOString();

		await paymentOrder.save();
		return paymentOrder;
	}
}
