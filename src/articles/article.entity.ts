import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { PaymentOrder } from 'src/payment-order/payment-order.entity';
import { OrderToArticle } from 'src/order-to-article/order-to-article.entity';

@Entity()
export class Article extends BaseEntity {
	@PrimaryGeneratedColumn() id: number;

	@Column() name: string;
	@Column() description: string;
	@Column({ default: 0 })
	ordered: number;
	@OneToMany(() => OrderToArticle, (orderToArticle: OrderToArticle) => orderToArticle.article, { cascade: true })
	orderToArticles: OrderToArticle[];
	// @ManyToOne(() => PaymentOrder, (paymentOrder) => paymentOrder.articles)
	// paymentOrder: PaymentOrder;
}
