import { Controller, Get, UseGuards, Query, ValidationPipe, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { PaymentOrderService } from './payment-order.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetPaymentOrdersFilterDto } from './dtos/get-payment-orders-filter.dto';
import { PaymentOrder } from './payment-order.entity';
import { CreatePaymentOrderDto } from './dtos/create-payment-order.dto';
import { create } from 'domain';
import { UpdatePaymentOrderDto } from './dtos/update-payment-order.dto';

@Controller('payment-order')
@UseGuards(JwtAuthGuard)
export class PaymentOrderController {
	constructor(private paymentOrderService: PaymentOrderService) {}

	@Get('/')
	async getPaymentOrders(
		@Query(ValidationPipe) getPaymentOrdersFilterDto: GetPaymentOrdersFilterDto
	): Promise<PaymentOrder[]> {
		return await this.paymentOrderService.getPaymentOrders(getPaymentOrdersFilterDto);
	}

	@Post('/')
	async createPaymentOrder(
		@Body(ValidationPipe) createPaymentOrderDto: CreatePaymentOrderDto
	): Promise<PaymentOrder> {
		return await this.paymentOrderService.createPaymentOrder(createPaymentOrderDto);
	}

	@Get('/:paymentOrderId')
	async getPaymentOrder(@Param('paymentOrderId') paymentOrderId: number): Promise<PaymentOrder> {
		return await this.paymentOrderService.getPaymentOrder(paymentOrderId);
	}

	@Delete('/:paymentOrderId')
	async deletePaymentOrder(@Param('paymentOrderId') paymentOrderId: number): Promise<void> {
		await this.paymentOrderService.deletePaymentOrder(paymentOrderId);
	}

	@Patch('/:paymentOrderId')
	async updatePaymentOrder(
		@Param('paymentOrderId') paymentOrderId: number,
		@Body(ValidationPipe) updatePaymentOrderDto: UpdatePaymentOrderDto
	): Promise<void> {
		await this.paymentOrderService.updatePaymentOrder(paymentOrderId, updatePaymentOrderDto);
	}
}
