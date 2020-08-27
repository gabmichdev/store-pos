import { IsOptional, IsNotEmpty, IsISO8601 } from 'class-validator';

export class GetPaymentOrdersFilterDto {
	@IsOptional() name: string;

	@IsOptional() description: string;

	@IsOptional()
	@IsNotEmpty()
	@IsISO8601()
	dateStart: string;

	@IsOptional()
	@IsNotEmpty()
	@IsISO8601()
	dateEnd: string;
}
