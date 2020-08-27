import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Article } from 'src/articles/article.entity';
import { OrderToArticle } from 'src/order-to-article/order-to-article.entity';

@Entity()
export class PaymentOrder extends BaseEntity {
	@PrimaryGeneratedColumn() id: number;

	@Column() name: string;
	@Column() description: string;
	@Column() date: string;
	// @ManyToMany(() => Article, (article) => article.paymentOrder)
	// articles: Article[];
	@OneToMany(() => OrderToArticle, (orderToArticle: OrderToArticle) => orderToArticle.paymentOrder, { cascade: true })
	orderToArticles: OrderToArticle[];
}
