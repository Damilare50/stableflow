import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ApiTags } from '@nestjs/swagger';
import { CreatePaymentDto, MongoIdDto } from './dto';
import { AuthGuard } from '../../guards/auth.guard';
import { User as AuthUser } from '../../decorator/user.decorator';
import { User } from '@privy-io/server-auth';

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
  async getPaymentById(@Param() dto: MongoIdDto): Promise<any> {
    const response = await this.paymentService.fetchPayment(dto.id);

    return {
      statusCode: HttpStatus.OK,
      data: response,
      message: 'payment fetched successfully',
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async listTransactions(@AuthUser() user: User): Promise<any> {
    const response = await this.paymentService.listTransactions(user);

    return {
      statusCode: HttpStatus.OK,
      data: response,
      message: 'transactions fetched successfully',
    };
  }
}
