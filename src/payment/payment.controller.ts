import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ApiTags } from '@nestjs/swagger';
import { CreatePaymentDto } from './dto';

@Controller('payment')
@ApiTags('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async createPayment(@Body() data: CreatePaymentDto): Promise<any> {
    const response = await this.paymentService.createPayment(data);

    return {
      statusCode: HttpStatus.OK,
      data: response,
      message: 'payment created successfully',
    };
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getPaymentById(@Param('id') id: string) {
    const response = await this.paymentService.fetchPayment(id);

    return {
      statusCode: HttpStatus.OK,
      data: response,
      message: 'payment fetched successfully',
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async listTransactions(
    @Headers('Authorization') authorization: string,
  ): Promise<any> {
    const response = await this.paymentService.listTransactions(authorization);

    return {
      statusCode: HttpStatus.OK,
      data: response,
      message: 'transactions fetched successfully',
    };
  }
}
