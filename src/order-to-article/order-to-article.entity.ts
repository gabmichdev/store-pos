import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable } from 'typeorm';
import { Article } from 'src/articles/article.entity';
import { PaymentOrder } from 'src/payment-order/payment-order.entity';

@Entity({ name: 'order_to_article' })
export class OrderToArticle extends BaseEntity {
	@PrimaryGeneratedColumn() id: number;

	@Column() articleCount: number;

	@ManyToOne(() => Article, { onDelete: 'CASCADE', onUpdate: 'CASCADE', eager: true })
	@JoinTable()
	article: Article;

	@ManyToOne(() => PaymentOrder, (paymentOrder: PaymentOrder) => paymentOrder.orderToArticles, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
		eager: true,
	})
	@JoinTable({ name: 'payment_order_id' })
	paymentOrder: PaymentOrder;
}
